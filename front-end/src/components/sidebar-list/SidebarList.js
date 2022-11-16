import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "@mui/material";
import styles from "./SidebarList.module.scss";
import { Home } from "assets/icons/Home";
import { Calendar } from "assets/icons/Calendar";
import { Materials } from "assets/icons/Materials";
import { Grammar } from "assets/icons/Grammar";
import { Students } from "assets/icons/Students";
import { Finances } from "assets/icons/Finances";

export const SidebarList = () => {
  return (
    <>
      <div className="sidebarMenu">
        <List className={styles.sidebarList}>
          <ListItem className={styles.sidebarItem}>
            <Link underline="none" href="#" className={styles.sidebarLink}>
              <Home />
              Dashboard
            </Link>
          </ListItem>
          <ListItem className={styles.sidebarItem}>
            <Link underline="none" href="#" className={styles.sidebarLink}>
              <Calendar />
              Calendar
            </Link>
          </ListItem>
          <ListItem className={styles.sidebarItem}>
            <Link underline="none" href="#" className={styles.sidebarLink}>
              <Materials />
              Materials
            </Link>
          </ListItem>
          <ListItem className={styles.sidebarItem}>
            <Link underline="none" href="#" className={styles.sidebarLink}>
              <Grammar />
              Grammar
            </Link>
          </ListItem>
          <ListItem className={styles.sidebarItem}>
            <Link underline="none" href="#" className={styles.sidebarLink}>
              <Students />
              Students
            </Link>
          </ListItem>
          <ListItem className={styles.sidebarItem}>
            <Link underline="none" href="#" className={styles.sidebarLink}>
              <Finances />
              Finances
            </Link>
          </ListItem>
        </List>
      </div>
    </>
  );
};
