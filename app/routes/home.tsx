import {
  Header,
  TopBar,
  Toolbar,
  Sidebar,
  Colors,
  Footer,
  ColorPreview,
  ColorDetail,
  ColorContrasts,
} from "~/components";
import type { Route } from "./+types/home";
import classes from "./home.module.css";
import clsx from "clsx/lite";
import { useThemeStore } from "store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Temabygger Prototype" },
    { name: "description", content: "Temabygger Prototype" },
  ];
}

export default function Home() {
  const shrinkSidebar = useThemeStore((state) => state.shrinkSidebar);
  const externalColorScheme = useThemeStore(
    (state) => state.externalColorScheme
  );
  const themeTab = useThemeStore((state) => state.themeTab);

  return (
    <div data-color-scheme={externalColorScheme} className={classes.app}>
      <TopBar />
      <Header />
      <div className="container">
        <div className={classes.content}>
          <div className={classes.main}>
            <Toolbar />
            {themeTab === "colorsystem" && (
              <>
                <Colors />
                <ColorPreview />
                <ColorDetail />
              </>
            )}
            {themeTab === "contrast" && (
              <>
                <ColorContrasts />
              </>
            )}
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
