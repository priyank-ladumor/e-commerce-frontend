// import React, { useState } from 'react'
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { NavLink } from 'react-router-dom'

// const user = {
//     name: 'Tom Cook',
//     email: 'tom@example.com',
//     imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }

// const navigation = [
//     { name: 'Men', currentCategory: "men", checked: true },
//     { name: 'Women', currentCategory: "women", checked: false },
//     { name: 'Kid', currentCategory: "kid", checked: false }
// ]

// const userNavigation = [
//     { name: 'Your Profile', href: '#' },
//     { name: 'My orders', href: '#' },
//     { name: 'Sign out', href: '#' },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// const Navbar = ({ children }) => {
//     const [checkcurrentCategory, setcheckcurrentCategory] = useState(false)
//     const auth = localStorage.getItem('token')
//     return (
//         <div>
//             <div className="min-h-full">
//                 <Disclosure as="nav" className="bg-gray-800">
//                     {({ open }) => (
//                         <>
//                             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                                 <div className="flex h-16 items-center justify-between">
//                                     <div className="flex items-center">
//                                         <div className="flex-shrink-0">
//                                             <NavLink to="/">
//                                                 <img
//                                                     className="h-15 w-12 rounded-xl"
//                                                     src="https://i.imgur.com/d7MoWpc.png"
//                                                     alt="Your Company"
//                                                 />
//                                             </NavLink>
//                                         </div>

//                                         {/* catagory men/women  */}
//                                         <div className="hidden md:block">
//                                             <div className="ml-10 flex items-baseline space-x-4">
//                                                 {navigation.map((item) => (
//                                                     <div
//                                                         onClick={() => [setcheckcurrentCategory(item.name), console.log(checkcurrentCategory)]}
//                                                         key={item.name}
//                                                         className={classNames(
//                                                             item.name === checkcurrentCategory
//                                                                 ? 'bg-gray-900 text-white'
//                                                                 : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                                             'rounded-md px-3 py-2 text-sm font-medium'
//                                                         )}
//                                                         style={{cursor:"pointer"}}
//                                                         aria-current={item.checked ? 'page' : undefined}
//                                                     >
//                                                         {item.name}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="hidden md:block">
//                                         <div className="ml-4 flex items-center md:ml-6">
//                                             <NavLink
//                                                 // type="button"
//                                                 to="/cart"
//                                                 className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                                             >
//                                                 <span className="absolute -inset-1.5" />
//                                                 <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
//                                             </NavLink>
//                                             <span
//                                                 className="inline-flex items-center rounded-md mb-5 -ml-3 z-10 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
//                                                 2
//                                             </span>

//                                             {/* Profile dropdown */}
//                                             {/* full screen */}
//                                             {auth &&
                                                // <Menu as="div" className="relative ml-3">
                                                //     <div>
                                                //         <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                //             <span className="absolute -inset-1.5" />
                                                //             <span className="sr-only">Open user menu</span>
                                                //             <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                //         </Menu.Button>
                                                //     </div>
                                                //     <Transition
                                                //         as={Fragment}
                                                //         enter="transition ease-out duration-100"
                                                //         enterFrom="transform opacity-0 scale-95"
                                                //         enterTo="transform opacity-100 scale-100"
                                                //         leave="transition ease-in duration-75"
                                                //         leaveFrom="transform opacity-100 scale-100"
                                                //         leaveTo="transform opacity-0 scale-95"
                                                //     >
                                                //         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                //             {userNavigation.map((item) => (
                                                //                 <Menu.Item key={item.name}>
                                                //                     {({ active }) => (
                                                //                         <a
                                                //                             href={item.href}
                                                //                             className={classNames(
                                                //                                 active ? 'bg-gray-100' : '',
                                                //                                 'block px-4 py-2 text-sm text-gray-700'
                                                //                             )}
                                                //                         >
                                                //                             {item.name}
                                                //                         </a>
                                                //                     )}
                                                //                 </Menu.Item>
                                                //             ))}
                                                //         </Menu.Items>
                                                //     </Transition>
                                                // </Menu>}
//                                         </div>
//                                     </div>
//                                     <div className="-mr-2 flex md:hidden">
//                                         {/* Mobile menu button */}
//                                         <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                             <span className="absolute -inset-0.5" />
//                                             <span className="sr-only">Open main menu</span>
//                                             {open ? (
//                                                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                                             ) : (
//                                                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                                             )}
//                                         </Disclosure.Button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Disclosure.Panel className="md:hidden">
//                                 <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
//                                     {navigation.map((item) => (
//                                         <Disclosure.Button
//                                             key={item.name}
//                                             as="a"
//                                             href={item.href}
//                                             className={classNames(
//                                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                                 'block rounded-md px-3 py-2 text-base font-medium'
//                                             )}
//                                             aria-current={item.current ? 'page' : undefined}
//                                         >
//                                             {item.name}
//                                         </Disclosure.Button>
//                                     ))}
//                                 </div>
//                                 {/* mobile view profile */}
//                                 {auth &&
//                                     <div className="border-t border-gray-700 pb-3 pt-4">
//                                         <div className="flex items-center px-5">
//                                             <div className="flex-shrink-0">
//                                                 <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
//                                             </div>
//                                             <div className="ml-3">
//                                                 <div className="text-base font-medium leading-none text-white">{user.name}</div>
//                                                 <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
//                                             </div>
//                                             <NavLink
//                                                 // type="button"
//                                                 to="/cart"
//                                                 className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                                             >
//                                                 <span className="absolute -inset-1.5" />
//                                                 <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
//                                             </NavLink>
//                                             <span
//                                                 className="inline-flex items-center rounded-md mb-5 -ml-3 z-10 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
//                                                 2
//                                             </span>
//                                         </div>
//                                         <div className="mt-3 space-y-1 px-2">
//                                             {userNavigation.map((item) => (
//                                                 <Disclosure.Button
//                                                     key={item.name}
//                                                     as="a"
//                                                     href={item.href}
//                                                     className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
//                                                 >
//                                                     {item.name}
//                                                 </Disclosure.Button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 }
//                             </Disclosure.Panel>
//                         </>
//                     )}
//                 </Disclosure>

//                 <header className="bg-white shadow">
//                     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                         <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shoppy.io</h1>
//                     </div>
//                 </header>
//                 <main>
//                     <div className="mx-auto max-w-7xl pt-10 pb-16 sm:px-6 lg:px-8">
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default Navbar