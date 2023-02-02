import React from 'react';

// Assets
import logo from 'assets/sidebar/logo-letter.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

// styles
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.logoContainer}>
            <div className={styles.sidebarImgBlock}>
              <Link to='/'>
                <img src={logo} alt='logo' width='30px' />
              </Link>
              <Link to='/'>
                <span className={styles.sidebarLogoText}>Inter School</span>
              </Link>
            </div>
          </div>
          <div className={styles.explanationContainer}>
            <p className={styles.explanation}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus eutri stique
              pellentesque donec
            </p>
          </div>
          <ul className={styles.iconsList}>
            <li className={styles.iconItem}>
              <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
            </li>
            <li className={styles.iconItem}>
              <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
            </li>
            <li className={styles.iconItem}>
              <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
            </li>
            <li className={styles.iconItem}>
              <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />
            </li>
          </ul>
        </div>
        <div className={styles.companyContainer}>
          <h4 className={styles.companyHeader}>Company</h4>
          <ul className={styles.companyInfoList}>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Home
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  About
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Blog
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Course
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.companyContainer}>
          <h4 className={styles.companyHeader}>Category</h4>
          <ul className={styles.companyInfoList}>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  All Course
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Marketing
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Art
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Designing
                </Link>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.companyInfoContainer}>
                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                <Link className={styles.info} to='/*'>
                  Data Analist
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.companyContainer}>
          <h4 className={styles.companyHeader}>Contact Us</h4>
          <ul className={styles.companyInfoList}>
            <li className={styles.companyInfoItem}>
              <div className={styles.contactContainer}>
                <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                <span className={styles.info}>+(111)256 3527 56</span>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.contactContainer}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                <span className={styles.info}>info@drivic.com</span>
              </div>
            </li>
            <li className={styles.companyInfoItem}>
              <div className={styles.contactContainer}>
                <FontAwesomeIcon icon={faLocationDot} className={styles.contactIcon} />
                <span className={styles.info}>Pl, London NW1 The United of Rochester Kingdom</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copyrightContainer}>
        <p className={styles.copyright}>Copyright © 2021 Inter School. All Right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
