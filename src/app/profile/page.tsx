import EditProfile from "@modules/Profile";
import PrivateRoute from "@modules/Security/PrivateRoute";
export default function ProfilePage() {
  return (
    <PrivateRoute>
      <EditProfile />
    </PrivateRoute>
  );
}
