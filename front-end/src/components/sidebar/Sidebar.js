import React from "react";
import { SidebarList } from "components/sidebar-list/SidebarList";
import styles from "./Sidebar.module.scss";
import logo from "assets/sidebar/logo-dark-text.png";
import logo1 from "assets/sidebar/logo-letter.png";
import avatar from "assets/sidebar/avatar.png";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        <section className={styles.sidebarSection}>
          <div className={styles.sidebarImgHolder}>
            <div className={styles.sidebarImgBlock}>
              <Link href="#">
                <img src={logo1} alt="logo" width="30px" />
              </Link>
            </div>
            <div className={styles.sidebarImgBlock}>
              <Link href="#">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className={styles.sidebarImgAvatar}>
            <img src={avatar} alt="logo" className={styles.sidebarAvatar} />
            <Typography variant="h6">Welcome back, User</Typography>
          </div>
          <SidebarList />
        </section>
      </aside>
    </>
  );
};
