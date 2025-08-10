"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Logo from '/public/assets/images/logo-cropped.svg'
import Sun from '/public/assets/images/icon-sun.svg'
import Moon from '/public/assets/images/icon-moon.svg'
import extensionData from './data/data.json'

type Extension = {
  logo: string;
  name: string;
  description: string
  isActive: boolean
}

// const extensions: Extension[] = [...extensionData]



export default function BrowserExtention () {

  const [ theme, setTheme ] = useState < 'light' | 'dark' | null > (null)
  const [ extensions , setExtensions] = useState<Extension[]>(extensionData);  
  const [ filter, setFilter ] = useState <'all'| 'active' | 'inactive'> ('all')


  useEffect(() => {
    const darken = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(darken ? 'dark' : 'light')
  }, [])
  useEffect(() => {
    if (theme)
    document.body.className = theme
  }, [theme])

  if (theme === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <span className="text-lg font-bold">Loading...</span>
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  };
  

  const toggleCheck = (name: string) => {
  
    const updatedExtensions = extensions.map((extension) =>
      extension.name === name
        ? { ...extension, isActive: !extension.isActive }
        : extension
    );
    setExtensions(updatedExtensions);
  }

  const handleDelete = (name: string) => {

    const filteredExtensions = extensions.filter((extension) => extension.name !== name)
    setExtensions(filteredExtensions)
  }

 

  const getFilteredExtentions = () => {
    if (filter === 'active') {
      return extensions.filter((extention) => extention.isActive === true)
    }
    else if (filter === 'inactive') {
      return extensions.filter((extention) => extention.isActive === false)
    }
    else{
      return extensions
    }
  }

  const displayedExtentions = getFilteredExtentions()


  return(
    <main className="p-3 pt-10 flex flex-col gap-8 bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-50 text-neutral-900 sm:px-[7%]">
      <section className="Header flex items-center justify-between shadow-md bg-neutral-50 dark:bg-neutral-800 p-2 rounded-lg">
        <div className="logo flex items-center gap-2">
          <Image src={Logo} alt="Logo"/>
          <h1 className="font-bold text-2xl">Extensions</h1>
        </div>
        <div onClick={toggleTheme} className="p-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg">
          {theme === 'dark' ? <Image src={Sun} alt="Sun-icon" /> : <Image src={Moon} alt="Moon-icon" />}
        </div>
      </section>

      <section className="flex flex-col sm:flex-row sm:justify-between sm:mt-10 items-center gap-6">
        <h1 className="font-bold text-4xl sm:text-[33px] md:text-4xl">Extensions List</h1>
        <div className="flex justify-between sm:justify-end w-[90%] text-xl font-medium flex-1 gap-2">
          <button className={`py-2 px-4 rounded-4xl bg-neutral-0 shadow-md dark:border dark:border-neutral-500 dark:bg-neutral-700 ${filter === 'all' && 'bg-red-700 text-neutral-50 dark:bg-red-500 dark:text-neutral-950 dark:border-0'} hover:bg-red-600 focus-visible:border focus-visible:border-red-600 cursor-pointer `} onClick={()=> setFilter('all')}>All</button>
          <button className={`py-2 px-4 rounded-4xl bg-neutral-0 shadow-md dark:border dark:border-neutral-500 dark:bg-neutral-700 ${filter === 'active' && 'bg-red-700 text-neutral-50 dark:bg-red-500 dark:text-neutral-950 dark:border-0'} hover:bg-red-600 focus-visible:bg-red-700 focus-visible:border focus-visible:border-red-600 cursor-pointer`} onClick={()=> setFilter('active')}>Active</button>
          <button className={`py-2 px-4 rounded-4xl bg-neutral-0 shadow-md dark:border dark:border-neutral-500 dark:bg-neutral-700 ${filter === 'inactive' && 'bg-red-700 text-neutral-50 dark:bg-red-500 dark:text-neutral-950 dark:border-0'} hover:bg-red-600 focus-visible:bg-red-700 focus-visible:border focus-visible:border-red-600 cursor-pointer`}onClick={()=> setFilter('inactive')}>Inactive</button>
        </div>
      </section>
      <section className="extensions flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
            {displayedExtentions.map((extension) => {
              return(
              <div key={extension.name} className="min-w-[250px] sm:max-w-none md:max-w-[320px] lg:max-w-[350px]  w-full h-[250px] justify-between p-5 rounded-xl flex flex-col gap-6 shadow-md dark:border dark:border-neutral-500 bg-neutral-50 dark:bg-neutral-800">
                  <article className="flex gap-4 items-start">
                    <img src={extension.logo} alt={extension.name} />  
                    <div>
                    <h2 className="font-bold text-xl">{extension.name}</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium"> {extension.description} </p>
                    </div>
                  </article>  
                  <article className="flex justify-between">
                    <button className="py-2 px-4 rounded-4xl border-2 border-neutral-300 dark:border-neutral-700 cursor-pointer hover:bg-red-700" onClick={() => handleDelete(extension.name)}>Remove</button>  
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" checked={extension.isActive} onChange={() =>toggleCheck(extension.name)}/>
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[12px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-700 dark:peer-checked:bg-red-500"></div>
                    </label>
                  </article>  
              </div>
              )
            })}
      </section>
    </main>
  )
}