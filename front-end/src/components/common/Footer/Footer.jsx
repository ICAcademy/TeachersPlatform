import React from 'react';

// assets
import logo from '../../../assets/images/logo-footer.png';
import Facebook from 'assets/icons/Facebook';
import Instagram from 'assets/icons/Instagram';
import Linkedin from 'assets/icons/Linkedin';
import Twitter from 'assets/icons/Twitter';
import ArrowRight from 'assets/icons/ArrowRight';
import Phone from 'assets/icons/Phone';
import Mail from 'assets/icons/Mail';
import Location from 'assets/icons/Location';

// styles
import styles from './Footer.module.scss';

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
                            <Facebook className={styles.icon} width='15' height='15' fill='#000' />
                        </li>
                        <li className={styles.iconItem}>
                            <Twitter className={styles.icon} width='15' height='15' fill='#000' />
                        </li>
                        <li className={styles.iconItem}>
                            <Instagram className={styles.icon} width='15' height='15' fill='#000' />
                        </li>
                        <li className={styles.iconItem}>
                            <Linkedin className={styles.icon} width='15' height='15' fill='#000' />
                        </li>
                    </ul>
                </div>
                <div className={styles.companyContainer}>
                    <h4 className={styles.companyHeader}>Company</h4>
                    <ul className={styles.companyInfoList}>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Home</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>About</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Blog</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Course</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Contact Us</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.companyContainer}>
                    <h4 className={styles.companyHeader}>Category</h4>
                    <ul className={styles.companyInfoList}>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>All Course</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Marketing</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Art</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
                                <a className={styles.info}>Designing</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div>
                                <ArrowRight className={styles.companyInfoItemSvg} width='10' height='10' fill='#fff' />
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
                                <Phone className={styles.companyInfoItemSvg} width='12' height='12' fill='#fff' />
                                <a className={styles.info}>+(111)256 3527 56</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.contactContainer}>
                                <Mail className={styles.companyInfoItemSvg} width='15' height='15' fill='#fff' />
                                <a className={styles.info}>info@drivic.com</a>
                            </div>
                        </li>
                        <li className={styles.companyInfoItem}>
                            <div className={styles.contactContainer}>
                                <Location className={styles.companyInfoItemSvg} width='12' height='12' fill='#fff' />
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
