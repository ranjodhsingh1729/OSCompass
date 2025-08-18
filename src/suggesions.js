class Suggestions {
  static async searchUsers(query) {
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=5`
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      return data.items || [];
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  }

  static async searchRepos(owner, query) {
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${query}+user:${owner}&per_page=5`
      );
      if (!res.ok) throw new Error("Failed to fetch repos");
      const data = await res.json();
      return data.items || [];
    } catch (err) {
      console.error("Error fetching repos:", err);
      return [];
    }
  }
}

export default Suggestions;
