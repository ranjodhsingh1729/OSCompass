import { useRef, useState, useEffect } from "react";
import Suggestions from "./suggesions";

export default function Landing(props) {
  const ownerRef = useRef();
  const repoRef = useRef();

  const [ownerQuery, setOwnerQuery] = useState("");
  const [repoQuery, setRepoQuery] = useState("");
  const [ownerSuggestions, setOwnerSuggestions] = useState([]);
  const [repoSuggestions, setRepoSuggestions] = useState([]);
  const [ownerFocused, setOwnerFocused] = useState(false);
  const [repoFocused, setRepoFocused] = useState(false);
  const [selectedOwnerSuggestionIndex, setSelectedOwnerSuggestionIndex] = useState(-1);
  const [selectedRepoSuggestionIndex, setSelectedRepoSuggestionIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.callback(ownerRef.current.value, repoRef.current.value);
  };

  // Fetch owners
  useEffect(() => {
    if (!ownerQuery) {
      setOwnerSuggestions([]);
      return;
    }
    setSelectedOwnerSuggestionIndex(-1);
    const debounce = setTimeout(async () => {
      const users = await Suggestions.searchUsers(ownerQuery);
      setOwnerSuggestions(users);
    }, 400);
    return () => clearTimeout(debounce);
  }, [ownerQuery]);

  // Fetch repos
  useEffect(() => {
    if (!repoQuery || !ownerRef.current?.value) {
      setRepoSuggestions([]);
      return;
    }
    setSelectedRepoSuggestionIndex(-1);
    const debounce = setTimeout(async () => {
      const repos = await Suggestions.searchRepos(
        ownerRef.current.value,
        repoQuery
      );
      setRepoSuggestions(repos);
    }, 400);
    return () => clearTimeout(debounce);
  }, [repoQuery]);

  const handleOwnerKeyDown = (e) => {
    if (ownerSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedOwnerSuggestionIndex(prevIndex => (prevIndex + 1) % ownerSuggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedOwnerSuggestionIndex(prevIndex => (prevIndex - 1 + ownerSuggestions.length) % ownerSuggestions.length);
    } else if (e.key === 'Enter') {
      if (selectedOwnerSuggestionIndex > -1) {
        e.preventDefault();
        const selectedUser = ownerSuggestions[selectedOwnerSuggestionIndex];
        setOwnerQuery(selectedUser.login);
        ownerRef.current.value = selectedUser.login;
        setOwnerSuggestions([]);
        setSelectedOwnerSuggestionIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setOwnerSuggestions([]);
      setSelectedOwnerSuggestionIndex(-1);
    }
  };

  const handleRepoKeyDown = (e) => {
    if (repoSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedRepoSuggestionIndex(prevIndex => (prevIndex + 1) % repoSuggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedRepoSuggestionIndex(prevIndex => (prevIndex - 1 + repoSuggestions.length) % repoSuggestions.length);
    } else if (e.key === 'Enter') {
      if (selectedRepoSuggestionIndex > -1) {
        e.preventDefault();
        const selectedRepo = repoSuggestions[selectedRepoSuggestionIndex];
        setRepoQuery(selectedRepo.name);
        repoRef.current.value = selectedRepo.name;
        setRepoSuggestions([]);
        setSelectedRepoSuggestionIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setRepoSuggestions([]);
      setSelectedRepoSuggestionIndex(-1);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {/* Owner input */}
        <div className="relative">
          <input
            className="flex-grow w-full px-4 py-3 text-gray-700 leading-tight focus:outline-none rounded-l-lg"
            type="text"
            name="owner"
            placeholder="Owner"
            id="owner"
            ref={ownerRef}
            value={ownerQuery}
            onChange={(e) => setOwnerQuery(e.target.value)}
            onFocus={() => setOwnerFocused(true)}
            onBlur={() => setTimeout(() => setOwnerFocused(false), 150)}
            onKeyDown={handleOwnerKeyDown}
            autoComplete="off"
          />
          {ownerFocused && ownerSuggestions.length > 0 && (
            <ul className="absolute bg-white border mt-1 w-full rounded shadow z-10">
              {ownerSuggestions.map((user, index) => (
                <li
                  key={user.id}
                  onMouseDown={() => {
                    setOwnerQuery(user.login);
                    ownerRef.current.value = user.login;
                    setOwnerSuggestions([]);
                  }}
                  onMouseOver={() => setSelectedOwnerSuggestionIndex(index)}
                  className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${index === selectedOwnerSuggestionIndex ? 'bg-gray-200' : ''}`}
                >
                  <img
                    src={user.avatar_url}
                    alt=""
                    className="w-5 h-5 rounded-full"
                  />
                  {user.login}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        {/* Repo input */}
        <div className="relative">
          <input
            className="flex-grow w-full px-4 py-3 text-gray-700 leading-tight focus:outline-none"
            type="text"
            name="repo"
            placeholder="Repo"
            id="repo"
            ref={repoRef}
            value={repoQuery}
            onChange={(e) => setRepoQuery(e.target.value)}
            onFocus={() => setRepoFocused(true)}
            onBlur={() => setTimeout(() => setRepoFocused(false), 150)}
            onKeyDown={handleRepoKeyDown}
            autoComplete="off"
          />
          {repoFocused && repoSuggestions.length > 0 && (
            <ul className="absolute bg-white border mt-1 w-full rounded shadow z-10">
              {repoSuggestions.map((repo, index) => (
                <li
                  key={repo.id}
                  onMouseDown={() => {
                    setRepoQuery(repo.name);
                    repoRef.current.value = repo.name;
                    setRepoSuggestions([]);
                  }}
                  onMouseOver={() => setSelectedRepoSuggestionIndex(index)}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${index === selectedRepoSuggestionIndex ? 'bg-gray-200' : ''}`}
                >
                  {repo.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search button */}
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded-r-lg"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="currentColor"
          >
            <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}