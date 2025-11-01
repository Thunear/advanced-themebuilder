import { Header, TopBar, Toolbar, Sidebar, Colors, Footer } from "~/components";
import type { Route } from "./+types/home";
import classes from "./home.module.css";
import clsx from "clsx/lite";
import { useThemeStore } from "store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const shrinkSidebar = useThemeStore((state) => state.shrinkSidebar);
  const externalColorScheme = useThemeStore(
    (state) => state.externalColorScheme
  );

  return (
    <div data-color-scheme={externalColorScheme} className={classes.app}>
      <TopBar />
      <Header />
      <div className="container">
        <div className={classes.content}>
          <div className={classes.main}>
            <Toolbar />
            <Colors />
          </div>
          <div className={clsx(classes.aside, shrinkSidebar && classes.shrink)}>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
