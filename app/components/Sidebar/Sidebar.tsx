import cl from "clsx/lite";
import { useEffect, useState } from "react";

import { useThemeStore } from "../../../store";

import {
  Dialog,
  Heading,
  Tabs,
  useMediaQuery,
} from "@digdir/designsystemet-react";
import { CogIcon } from "@navikt/aksel-icons";
import { BorderRadiusInput } from "../BorderRadiusInput/BorderRadiusInput";
import { ColorsPane, FrontPane } from "../../panes";
import classes from "./Sidebar.module.css";

export const Sidebar = () => {
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [modalOpen, setModalOpen] = useState(false);

  const [isSticky, setSticky] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLightnessPage, setShowLightnessPage] = useState(true);

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
          {activePane.startsWith("colors") && <ColorsPane />}
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
              onChange={(value) =>
                setActivePane(value as "colors" | "dimensions")
              }
            >
              <Tabs.List>
                <Tabs.Tab value="colors">Farger</Tabs.Tab>
                <Tabs.Tab value="dimensions">Dimensjoner</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel className={classes.tabPanel} value="colors">
                <ColorsPane />
              </Tabs.Panel>
              <Tabs.Panel className={classes.tabPanel} value="dimensions">
                <BorderRadiusInput />
              </Tabs.Panel>
            </Tabs>
          </Dialog.Block>
        </Dialog>
      )}
    </>
  );
};
