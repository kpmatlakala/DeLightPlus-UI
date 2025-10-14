// // components/FloatingHeader.tsx
// 'use client'

// import React, { useEffect, useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Button } from "@/components/Button"
// import {
//   Drawer,
//   DrawerTrigger,
//   DrawerContent,
//   DrawerClose,
//   DrawerHeader,
//   DrawerFooter,
//   DrawerTitle,
//   DrawerDescription,
// } from "delightplus-ui"

// export const FloatingHeader = () => {
//   const pathname = usePathname()
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }

//     handleScroll()
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <header
//       className={`fixed top-0 z-50 w-full transition-shadow backdrop-blur-lg ${
//         isScrolled ? "shadow-md" : ""
//       }`}
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
//         <Link href="/" className="text-xl font-bold">
//           delight<span className="text-primary">+</span>
//         </Link>

//         <div className="flex items-center gap-3">
//           {/* Drawer Button for Mobile / Menu */}
//           <Drawer>
//             <DrawerTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <span className="sr-only">Open menu</span>
//                 {/* You can replace this with your own icon */}
//                 ☰
//               </Button>
//             </DrawerTrigger>

//             <DrawerContent>
//               <DrawerHeader>
//                 <DrawerTitle>Navigation</DrawerTitle>
//                 <DrawerDescription>Main site links</DrawerDescription>
//               </DrawerHeader>

//               <nav className="flex flex-col gap-4 px-4 py-2">
//                 <Link href="/" className="text-lg font-medium">
//                   Home
//                 </Link>
//                 <Link href="/docs" className="text-lg font-medium">
//                   Docs
//                 </Link>
//                 <Link href="/components" className="text-lg font-medium">
//                   Components
//                 </Link>
//                 <Button disabled variant="secondary">
//                   3D (Coming soon)
//                 </Button>
//               </nav>

//               <DrawerFooter>
//                 <DrawerClose asChild>
//                   <Button variant="ghost">Close</Button>
//                 </DrawerClose>
//               </DrawerFooter>
//             </DrawerContent>
//           </Drawer>
//         </div>
//       </div>
//     </header>
//   )
// }
