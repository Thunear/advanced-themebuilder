import cl from "clsx/lite";
import { useEffect, useState } from "react";

import { useThemeStore } from "../../../store";

import {
  Dialog,
  Heading,
  Tabs,
  useMediaQuery,
} from "@digdir/designsystemet-react";
import { CogIcon, RocketIcon } from "@navikt/aksel-icons";
import { RadiusPane } from "../../panes/RadiusPane/RadiusPane";
import { ColorsPane, FrontPane } from "../../panes";
import classes from "./Sidebar.module.css";

export const Sidebar = () => {
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [modalOpen, setModalOpen] = useState(false);

  const [isSticky, setSticky] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <button
          className={cl(
            classes.toggle,
            showSidebar && classes.toggleOpen,
            "ds-focus-visible"
          )}
          onClick={() => {
            !isMobile && setShowSidebar(!showSidebar);
            isMobile && setModalOpen(true);
          }}
          aria-label="Toggle sidebar"
        >
          <CogIcon title="tannhjul" fontSize="1.5rem" />
        </button>
        <div
          className={cl(
            classes.sidebar,
            isSticky && classes.sticky,
            showSidebar && classes.showSidebar
          )}
        >
          {activePane === "front" && <FrontPane />}
          {activePane === "radius" && <RadiusPane />}
          {activePane.startsWith("colors") && <ColorsPane />}
          {activePane === "front" && (
            <div className={classes.btnGroup}>
              <button
                className={classes.btn}
                onClick={() => {
                  setActivePane("front");
                }}
              >
                <RocketIcon title="a11y-title" fontSize="1.5rem" />
                Ta i bruk tema
              </button>
              <button
                className={cl(classes.btn, classes.secondaryBtn)}
                onClick={() => {
                  setActivePane("front");
                }}
              >
                <CogIcon title="a11y-title" fontSize="1.5rem" />
                Importer config
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <Dialog
          open={modalOpen}
          className={classes.modal}
          onClose={() => setModalOpen(false)}
        >
          <Dialog.Block>
            <Heading>Tema</Heading>
          </Dialog.Block>
          <Dialog.Block className={classes.tabsWrapper}>
            <Tabs
              value={activePane}
              onChange={(value) => setActivePane(value as "colors" | "radius")}
            >
              <Tabs.List>
                <Tabs.Tab value="colors">Farger</Tabs.Tab>
                <Tabs.Tab value="radius">Radius</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel className={classes.tabPanel} value="colors">
                <ColorsPane />
              </Tabs.Panel>
            </Tabs>
          </Dialog.Block>
        </Dialog>
      )}
    </>
  );
};
