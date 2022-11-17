import React from 'react';

// assets
import logo from '../../../assets/images/logo-footer.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebookF, 
    faInstagram, 
    faLinkedinIn, 
    faTwitter 
} from '@fortawesome/free-brands-svg-icons';

// styles
import styles from './Footer.module.scss';
import { faChevronRight, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.content}>
                <div className={styles.siksha}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={logo} />
                    </div>
                    <div className={styles.explanationContainer}>
                        <p className={styles.explanation}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus eutri stique pellentesque donec</p>
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
                                <a className={styles.info}>Home</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>About</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Blog</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Course</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Contact Us</a>
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
                                <a className={styles.info}>All Course</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Marketing</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Art</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Designing</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.companyInfoContainer}>
                                <FontAwesomeIcon icon={faChevronRight} className={styles.companyInfoItemSvg} />
                                <a className={styles.info}>Data Analist</a>
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
                                <a className={styles.info}>+(111)256 3527 56</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.contactContainer}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                                <a className={styles.info}>info@drivic.com</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.contactContainer}>
                                <FontAwesomeIcon icon={faLocationDot} className={styles.contactIcon} />
                                <a className={styles.info}>Pl, London NW1 The United of Rochester Kingdom</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyrightContainer}>
                <p className={styles.copyright}>Copyright © 2021 Siksha. All Right reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
