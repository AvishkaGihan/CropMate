import { useSelector } from "react-redux";

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        {role === "farmer" && (
          <>
            <li className="mb-2">Farmer Tab 1</li>
            <li className="mb-2">Farmer Tab 2</li>
          </>
        )}
        {role === "driver" && (
          <>
            <li className="mb-2">Driver Tab 1</li>
            <li className="mb-2">Driver Tab 2</li>
          </>
        )}
        {role === "user" && (
          <>
            <li className="mb-2">User Tab 1</li>
            <li className="mb-2">User Tab 2</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
