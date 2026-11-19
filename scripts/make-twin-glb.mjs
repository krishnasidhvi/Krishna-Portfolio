// Builds public/twin.glb (the AR model of the AI twin) from the humanoid signed distance field in index.html.
// The SDF code between /*SDF-START*/ and /*SDF-END*/ is the single source for both the particle twin and this mesh.
// Usage: npm run twin
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const src = html.split('/*SDF-START*/')[1].split('/*SDF-END*/')[0];
const TwinSDF = new Function(src + '\nreturn TwinSDF;')();
const { sdf, normal, color } = TwinSDF;

// ---- surface nets over a regular grid ----
const H = 0.045, X0 = -2.6, X1 = 2.6, Y0 = -2.45, Y1 = 3.1, Z0 = -1.25, Z1 = 1.3;
const nx = Math.ceil((X1 - X0) / H) + 1, ny = Math.ceil((Y1 - Y0) / H) + 1, nz = Math.ceil((Z1 - Z0) / H) + 1;
const at = (i, j, k) => (k * ny + j) * nx + i;
const val = new Float32Array(nx * ny * nz);
for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++)
  val[at(i, j, k)] = sdf([X0 + i * H, Y0 + j * H, Z0 + k * H]);

const cellVert = new Int32Array((nx - 1) * (ny - 1) * (nz - 1)).fill(-1);
const cAt = (i, j, k) => (k * (ny - 1) + j) * (nx - 1) + i;
const pos = [];
const CORNERS = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
const EDGES = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
  const v = CORNERS.map(([a, b, c]) => val[at(i + a, j + b, k + c)]);
  if (v.every((x) => x < 0) || v.every((x) => x >= 0)) continue;
  let sx = 0, sy = 0, sz = 0, n = 0;
  for (const [e0, e1] of EDGES) {
    if ((v[e0] < 0) === (v[e1] < 0)) continue;
    const t = v[e0] / (v[e0] - v[e1]);
    const p0 = CORNERS[e0], p1 = CORNERS[e1];
    sx += p0[0] + (p1[0] - p0[0]) * t; sy += p0[1] + (p1[1] - p0[1]) * t; sz += p0[2] + (p1[2] - p0[2]) * t; n++;
  }
  cellVert[cAt(i, j, k)] = pos.length / 3;
  pos.push(X0 + (i + sx / n) * H, Y0 + (j + sy / n) * H, Z0 + (k + sz / n) * H);
}

const tris = [];
function quad(a, b, c, d) {
  if (a < 0 || b < 0 || c < 0 || d < 0) return;
  tris.push(a, b, c, a, c, d);
}
for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
  const v0 = val[at(i, j, k)];
  if (i < nx - 1 && j > 0 && k > 0 && j < ny - 1 && k < nz - 1 && (v0 < 0) !== (val[at(i + 1, j, k)] < 0))
    quad(cellVert[cAt(i, j - 1, k - 1)], cellVert[cAt(i, j, k - 1)], cellVert[cAt(i, j, k)], cellVert[cAt(i, j - 1, k)]);
  if (j < ny - 1 && i > 0 && k > 0 && i < nx - 1 && k < nz - 1 && (v0 < 0) !== (val[at(i, j + 1, k)] < 0))
    quad(cellVert[cAt(i - 1, j, k - 1)], cellVert[cAt(i - 1, j, k)], cellVert[cAt(i, j, k)], cellVert[cAt(i, j, k - 1)]);
  if (k < nz - 1 && i > 0 && j > 0 && i < nx - 1 && j < ny - 1 && (v0 < 0) !== (val[at(i, j, k + 1)] < 0))
    quad(cellVert[cAt(i - 1, j - 1, k)], cellVert[cAt(i, j - 1, k)], cellVert[cAt(i, j, k)], cellVert[cAt(i - 1, j, k)]);
}

// normals + colours from the SDF; wind every triangle so it faces outwards
const vc = pos.length / 3, nor = new Float32Array(vc * 3), col = new Float32Array(vc * 3);
for (let v = 0; v < vc; v++) {
  const p = [pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]], n = normal(p), c = color(p, n);
  nor.set(n, v * 3); col.set(c.map((x) => Math.min(1, x)), v * 3);
}
for (let t = 0; t < tris.length; t += 3) {
  const [a, b, c] = [tris[t], tris[t + 1], tris[t + 2]];
  const ux = pos[b * 3] - pos[a * 3], uy = pos[b * 3 + 1] - pos[a * 3 + 1], uz = pos[b * 3 + 2] - pos[a * 3 + 2];
  const wx = pos[c * 3] - pos[a * 3], wy = pos[c * 3 + 1] - pos[a * 3 + 1], wz = pos[c * 3 + 2] - pos[a * 3 + 2];
  const fx = uy * wz - uz * wy, fy = uz * wx - ux * wz, fz = ux * wy - uy * wx;
  if (fx * nor[a * 3] + fy * nor[a * 3 + 1] + fz * nor[a * 3 + 2] < 0) { tris[t + 1] = c; tris[t + 2] = b; }
}

// real-world scale for AR: ~0.65 m tall bust standing on y = 0
const S = 0.12, P = new Float32Array(vc * 3);
const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
for (let v = 0; v < vc; v++) {
  const x = pos[v * 3] * S, y = (pos[v * 3 + 1] + 2.3) * S, z = pos[v * 3 + 2] * S;
  P[v * 3] = x; P[v * 3 + 1] = y; P[v * 3 + 2] = z;
  [x, y, z].forEach((q, d) => { if (q < min[d]) min[d] = q; if (q > max[d]) max[d] = q; });
}
const I = new Uint32Array(tris);

// ---- GLB writer ----
const views = [P, nor, col, I].map((a) => Buffer.from(a.buffer, a.byteOffset, a.byteLength));
let off = 0;
const bufferViews = views.map((b, i) => { const v = { buffer: 0, byteOffset: off, byteLength: b.length, target: i < 3 ? 34962 : 34963 }; off += b.length; return v; });
const gltf = {
  asset: { version: '2.0', generator: 'make-twin-glb.mjs (Medallion Reel)' },
  scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0, name: 'AI twin' }],
  meshes: [{ name: 'twin', primitives: [{ attributes: { POSITION: 0, NORMAL: 1, COLOR_0: 2 }, indices: 3, material: 0 }] }],
  materials: [{ name: 'hologram', pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0.35, roughnessFactor: 0.35 }, emissiveFactor: [0.05, 0.12, 0.2] }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: vc, type: 'VEC3', min, max },
    { bufferView: 1, componentType: 5126, count: vc, type: 'VEC3' },
    { bufferView: 2, componentType: 5126, count: vc, type: 'VEC3' },
    { bufferView: 3, componentType: 5125, count: I.length, type: 'SCALAR' },
  ],
  bufferViews, buffers: [{ byteLength: off }],
};
const pad4 = (b, fill) => { const p = (4 - (b.length % 4)) % 4; return p ? Buffer.concat([b, Buffer.alloc(p, fill)]) : b; };
const json = pad4(Buffer.from(JSON.stringify(gltf)), 0x20), bin = pad4(Buffer.concat(views), 0);
const header = Buffer.alloc(12); header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + json.length + 8 + bin.length, 8);
const ch = (len, type) => { const b = Buffer.alloc(8); b.writeUInt32LE(len, 0); b.writeUInt32LE(type, 4); return b; };
const glb = Buffer.concat([header, ch(json.length, 0x4e4f534a), json, ch(bin.length, 0x004e4942), bin]);
writeFileSync(resolve(root, 'public/twin.glb'), glb);
console.log(`twin.glb: ${vc} vertices, ${I.length / 3} triangles, ${(glb.length / 1024).toFixed(0)} KB, height ${(max[1] - min[1]).toFixed(2)} m`);
