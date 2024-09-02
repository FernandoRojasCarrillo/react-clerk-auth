import styles from "./Home.module.css";
import { UserButton } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import useAxiosInstance from "./hooks/useAxiosInstance";

export function Home() {
  const { getToken } = useAuth();
  const axiosInstance = useAxiosInstance();

  const fetchDataFromBackend = async () => {
    try {
      const token = await getToken();
      const { data } = await axiosInstance.get("/protected");

      console.log("data ", data);
      console.log("token ", token);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.fullWidth}>
      <header>
        <div className={styles.logoRow}>
          <UserButton afterSignOutAllUrl="/sign-in" />

          <button
            className="px-6 py-4 bg-blue-700 text-white rounded-2xl"
            onClick={fetchDataFromBackend}
          >
            Obtener Datos
          </button>
        </div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Home</button>
        </nav>
      </header>

      <main className={styles.main}>
        <span className={styles.heading}>Home</span>
        <span className={styles.subHeading}>Welcome to your application</span>
        <div className={styles.grid}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </main>
    </div>
  );
}
