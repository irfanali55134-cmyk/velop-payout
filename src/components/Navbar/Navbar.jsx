import { useState } from "react";

import {
  Menu,
  X,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Wallet,
  Gift,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import styles from "./Navbar.module.css";

function Navbar() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);


  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "Rewards",
      icon: Gift,
      href: "/rewards",
    },
    {
      label: "Payout",
      icon: Wallet,
      href: "/payout",
    },
    {
      label: "History",
      icon: History,
      href: "/history",
    },
  ];


  const currentPath =
    window.location.pathname;


  return (
    <header className={styles.navbar}>

      <div className={styles.navbarInner}>

        {/* =========================
            LOGO
        ========================= */}

        <a
          href="/dashboard"
          className={styles.logo}
        >

          <div className={styles.logoMark}>
            V
          </div>

          <div className={styles.logoText}>

            <span className={styles.logoMain}>
              VELOOP
            </span>

            <span className={styles.logoSub}>
              REWARDS
            </span>

          </div>

        </a>


        {/* =========================
            DESKTOP NAV
        ========================= */}

        <nav className={styles.desktopNav}>

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              currentPath ===
              item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`${styles.navItem} ${
                  active
                    ? styles.active
                    : ""
                }`}
              >

                <Icon size={17} />

                <span>
                  {item.label}
                </span>

              </a>
            );

          })}

        </nav>


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className={styles.navRight}>

          <button
            type="button"
            className={
              styles.notificationButton
            }
            aria-label="Notifications"
          >

            <Bell size={19} />

            <span
              className={
                styles.notificationDot
              }
            />

          </button>


          <div className={styles.navDivider} />


          {/* PROFILE */}

          <div
            className={
              styles.profileWrapper
            }
          >

            <button
              type="button"
              className={
                styles.profileButton
              }
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
            >

              <div
                className={styles.avatar}
              >
                IA
              </div>

              <div
                className={
                  styles.profileInfo
                }
              >

                <strong>
                  Irfan Ali
                </strong>

                <span>
                  Member
                </span>

              </div>

              <ChevronDown
                size={16}
                className={
                  profileOpen
                    ? styles.chevronOpen
                    : ""
                }
              />

            </button>


            {profileOpen && (

              <div
                className={
                  styles.profileDropdown
                }
              >

                <a href="/profile">

                  <User size={16} />

                  <span>
                    Profile
                  </span>

                </a>


                <a href="/settings">

                  <Settings size={16} />

                  <span>
                    Settings
                  </span>

                </a>


                <div
                  className={
                    styles.dropdownDivider
                  }
                />


                <button
                  type="button"
                  className={
                    styles.logoutButton
                  }
                >

                  <LogOut size={16} />

                  <span>
                    Logout
                  </span>

                </button>

              </div>

            )}

          </div>


          {/* MOBILE BUTTON */}

          <button
            type="button"
            className={
              styles.mobileMenuButton
            }
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            aria-label="Toggle menu"
          >

            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </div>

      </div>


      {/* =========================
          MOBILE MENU
      ========================= */}

      {mobileOpen && (

        <div
          className={
            styles.mobileMenu
          }
        >

          <nav>

            {navItems.map((item) => {

              const Icon = item.icon;

              const active =
                currentPath ===
                item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`${styles.mobileNavItem} ${
                    active
                      ? styles.mobileActive
                      : ""
                  }`}
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                >

                  <Icon size={18} />

                  <span>
                    {item.label}
                  </span>

                </a>
              );

            })}

          </nav>

        </div>

      )}

    </header>
  );
}

export default Navbar;