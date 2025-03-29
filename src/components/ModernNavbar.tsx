import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, Home, User, Briefcase, FileText, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
  items?: NavSubItem[];
}

interface NavSubItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  logo?: {
    text: string;
    url: string;
  };
  items?: NavItem[];
}

export function ModernNavbar({ 
  logo = { text: "Brand", url: "/" },
  items = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/about", icon: User },
    { name: "Projects", url: "/projects", icon: Briefcase },
    { name: "Blog", url: "/blog", icon: FileText },
    { 
      name: "Services", 
      url: "#", 
      icon: FileText,
      items: [
        {
          title: "Web Development",
          description: "Custom websites and web applications",
          url: "/services/web",
        },
        {
          title: "Mobile Apps",
          description: "iOS and Android application development",
          url: "/services/mobile",
        },
        {
          title: "Consulting",
          description: "Expert advice for your digital projects",
          url: "/services/consulting",
        }
      ]
    }
  ]
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0].name);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-background/50 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={logo.url}
            className="text-lg font-semibold text-foreground"
          >
            {logo.text}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {items.map((item) => (
                  item.items ? (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className={cn(
                        "px-4 py-2 text-sm font-medium",
                        activeItem === item.name ? "text-primary" : "text-foreground/80"
                      )}>
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.items.map((subItem) => (
                            <li key={subItem.title} className="row-span-1">
                              <NavigationMenuLink asChild>
                                <Link
                                  to={subItem.url}
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                >
                                  <div className="mb-2 mt-4 text-sm font-medium">
                                    {subItem.title}
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.name}>
                      <Link
                        to={item.url}
                        onClick={() => setActiveItem(item.name)}
                        className={cn(
                          "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors",
                          "text-foreground/80 hover:text-primary",
                          activeItem === item.name && "text-primary"
                        )}
                      >
                        {item.name}
                        {activeItem === item.name && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          >
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                              <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                              <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                              <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                            </div>
                          </motion.div>
                        )}
                      </Link>
                    </NavigationMenuItem>
                  )
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left">{logo.text}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.name} className="py-2">
                      {item.items ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.name}</span>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                          <div className="ml-4 mt-2 flex flex-col gap-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.url}
                                className="text-sm text-muted-foreground hover:text-foreground"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.url}
                          className="flex items-center gap-2 text-sm font-medium"
                          onClick={() => {
                            setActiveItem(item.name);
                            setIsOpen(false);
                          }}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 