import { execSync } from "node:child_process";

/**
 * Rama y commit del build, para el footer de la portada. En Vercel salen de
 * VERCEL_GIT_COMMIT_REF y VERCEL_GIT_COMMIT_SHA; en local, de git. Si no hay ninguno,
 * los campos quedan vacíos y el footer muestra `[dev]` sin enlace: nunca rompe el build.
 */
export type BuildCommit = {
  branch?: string;
  /** Sha completo, para el enlace. */
  sha?: string;
  /** Sha corto de 7 caracteres, para el texto. */
  short?: string;
  url?: string;
};

const REPO_URL = "https://github.com/kendallchacon/portfolio";

function git(args: string): string | undefined {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || undefined;
  } catch {
    return undefined;
  }
}

function read(): BuildCommit {
  const branchRaw = process.env.VERCEL_GIT_COMMIT_REF || git("rev-parse --abbrev-ref HEAD");
  const shaRaw = process.env.VERCEL_GIT_COMMIT_SHA || git("rev-parse HEAD");
  // Con HEAD separado, git devuelve "HEAD": no es una rama.
  const branch = branchRaw && branchRaw !== "HEAD" ? branchRaw : undefined;
  const sha = shaRaw && /^[0-9a-f]{7,40}$/i.test(shaRaw) ? shaRaw.toLowerCase() : undefined;
  if (!sha) return { branch };
  return { branch, sha, short: sha.slice(0, 7), url: `${REPO_URL}/commit/${sha}` };
}

/** Se lee una vez por build. */
export const buildCommit: BuildCommit = read();
