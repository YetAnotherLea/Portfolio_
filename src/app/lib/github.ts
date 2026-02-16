export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
}

export async function getGitHubProjects(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = "YetAnotherLea";

  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Détails erreur GitHub:", errorData);
    throw new Error('Erreur lors de la récupération des projets GitHub');
  }

  const allRepos: GitHubRepo[] = await res.json();
  return allRepos.filter(repo => repo.topics && repo.topics.includes('portfolio'));
}