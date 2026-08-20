"use client"

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Divider,
} from "@heroui/react"

import NextLink from "next/link"
import clsx from "clsx"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import FormUtilities from "./navbar/formsutilities"

import { siteConfig } from "@/config/site"
import { ThemeSwitch } from "@/components/theme-switch"
import { BrandLogo } from "@/components/icons"
import { LuDownload } from "react-icons/lu"

export const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)

  // PWA install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    const handleAppInstalled = () => {
      setShowInstallButton(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      )

      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallApp = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstallButton(false)
    }

    setDeferredPrompt(null)
  }

  const handleLinkClick = (href: string) => {
    if (!href) return

    setMenuOpen(false)
    router.push(href)
  }

  if (pathname.includes("/room-planner")) {
    return null
  }

  return (
    <NextUINavbar
      isMenuOpen={menuOpen}
      maxWidth="full"
      onMenuOpenChange={setMenuOpen}
      className="xl:px-12"
      style={{
        backgroundColor: "#9B0D15",
        color: "#FFFFFF",
      }}
    >
      {/* Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3">
          <NextLink
            className="flex items-center justify-between gap-1"
            href="/"
          >
            <BrandLogo />

            <p className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
              DMCI HOMES
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden xl:flex" justify="center">
        <NavbarItem>
          <ul className="hidden gap-6 lg:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "w-full text-left uppercase",
                    pathname === item.href && "font-bold",
                  )}
                  style={{
                    color: pathname === item.href ? "#FFFFFF" : "#FFFFFF",
                    opacity: pathname === item.href ? 1 : 0.85,
                  }}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Right Section */}
      <NavbarContent
        className="hidden basis-1/5 sm:basis-full xl:flex"
        justify="end"
      >
        <NavbarItem className="flex items-center gap-3">
          <FormUtilities />

          {showInstallButton && (
            <Button
              onPress={handleInstallApp}
              isIconOnly
              aria-label="Install App"
              className="rounded-full p-2"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#9B0D15",
              }}
            >
              <LuDownload size={20} />
            </Button>
          )}

          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Navbar */}
      <NavbarContent className="basis-1 pl-4 xl:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          style={{
            color: "#FFFFFF",
          }}
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu
        style={{
          backgroundColor: "#FFFFFF",
          color: "#373A36",
        }}
      >
        <div className="mt-2 flex flex-col gap-2">
          {/* Main Navigation */}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <button
                type="button"
                className={clsx(
                  "w-full text-left",
                  pathname === item.href && "font-bold",
                )}
                style={{
                  color: pathname === item.href ? "#9B0D15" : "#373A36",
                }}
                onClick={() => handleLinkClick(item.href)}
              >
                {item.label}
              </button>
            </NavbarMenuItem>
          ))}

          <Divider
            className="my-4"
            style={{
              backgroundColor: "#373A36",
              opacity: 0.2,
            }}
          />

          <div className="space-y-1">
            <p
              className="text-small"
              style={{
                color: "#373A36",
                opacity: 0.6,
              }}
            >
              Form & Utilities
            </p>
          </div>

          {/* Form & Utilities */}
          {siteConfig.navMenuItemsLinks.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              {/* Customer Reservation Form: display only */}
              {item.label === "Customer Reservation Form" ? (
                <span
                  className="block w-full cursor-default text-left"
                  aria-disabled="true"
                  style={{
                    color: "#373A36",
                    opacity: 0.5,
                  }}
                >
                  {item.label}
                </span>
              ) : item.download ? (
                <a
                  download
                  href={item.href}
                  className="block w-full text-left"
                  style={{
                    color: pathname === item.href ? "#9B0D15" : "#373A36",
                    fontWeight: pathname === item.href ? 700 : 400,
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="w-full text-left"
                  style={{
                    color: pathname === item.href ? "#9B0D15" : "#373A36",
                    fontWeight: pathname === item.href ? 700 : 400,
                  }}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {item.label}
                </button>
              )}
            </NavbarMenuItem>
          ))}

          {/* Install App */}
          {showInstallButton && (
            <NavbarMenuItem
              className="cursor-pointer font-medium"
              style={{
                color: "#9B0D15",
              }}
              onClick={() => {
                handleInstallApp()
                setMenuOpen(false)
              }}
            >
              Install App
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
