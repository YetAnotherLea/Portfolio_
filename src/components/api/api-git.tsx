import { useEffect, useState } from "react";

interface Repo {
  name: string;
}

function ApiGit() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "https://api.github.com/users/yetanotherlea/repos"
      );
      const data = await res.json();
      setRepos(data);
    }

    load();
  }, []);

  return (
    <>
      <p>{repos.map((repo) => repo.name).join(", ")}</p>
    </>
  );
}

export default ApiGit;
