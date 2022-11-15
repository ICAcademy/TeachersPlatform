import React from "react";
import { SidebarList } from "components/sidebar-list/SidebarList";
import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        <div className="sidebar__img-holder">
          <img src="../../../sidebar/logo-dark-text.png" alt="logo"></img>
        </div>
        <SidebarList />
      </aside>
    </>
  );
};
