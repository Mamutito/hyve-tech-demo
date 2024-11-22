import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome {user?.name} to your Dashboard!
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-col ">
                <p>What do you want to do?</p>
                <Button
                  onClick={() => navigate("products")}
                  className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600"
                >
                  Products Management
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600"
                >
                  Back to the site
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
