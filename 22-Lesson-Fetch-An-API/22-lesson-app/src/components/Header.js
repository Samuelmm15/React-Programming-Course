import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Employees", href: "/employees" },
  { name: "Customers", href: "/customers" },
  { name: "Dictionary", href: "/dictionary" },
  { name: "Definition", href: "/definition" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Se debe de establecer posteriormente el props, ya que este permite el empleo de los componentes hijos.
export default function Header(props) {
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-14 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          // Hay que tener en cuenta que se cambia href por to, ya que se emplea react-router-dom
                          to={item.href}
                          // className={classNames(
                          //   item.current
                          //     ? "no-underline bg-gray-900 text-white"
                          //     : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white",
                          //   "rounded-md px-3 py-2 text-sm font-medium"
                          // )}
                          className={({ isActive }) => {
                            // Lo que estamos haciendo aquí es que cuando se active la ruta se le agregue a el
                            // enlace una tonalidad y un efecto distinto, por tanto, lo que se hace en esta zona es que
                            // cuando sea activado el link, es decir, esté activo funcione esto
                            return (
                              // Nótese que si queremos que solo se ilumine el link de la página que se está usando, tenemos que
                              // marcar la opción de !isActive.
                              "no-underline rounded-md px-3 py-2 text-sm font-medium" +
                              (!isActive
                                ? "no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                                : "no-underline bg-gray-900 text-white")
                            );
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    // Hay que tener en cuenta que se cambia href por to, ya que se emplea react-router-dom
                    to={item.href}
                    // className={classNames(
                    //   item.current
                    //     ? "no-underline bg-gray-900 text-white"
                    //     : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white",
                    //   "rounded-md px-3 py-2 text-sm font-medium"
                    // )}
                    className={({ isActive }) => {
                      // Lo que estamos haciendo aquí es que cuando se active la ruta se le agregue a el
                      // enlace una tonalidad y un efecto distinto, por tanto, lo que se hace en esta zona es que
                      // cuando sea activado el link, es decir, esté activo funcione esto
                      return (
                        // Nótese que si queremos que solo se ilumine el link de la página que se está usando, tenemos que
                        // marcar la opción de !isActive.
                        "no-underline block rounded-md px-3 py-2 text-base font-medium" +
                        (!isActive
                          ? "no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "no-underline bg-gray-900 text-white")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
            {/* Se debe de añadir el props.children para que se pueda emplear el componente hijo. */}
            <footer>example</footer>
          </>
        )}
      </Disclosure>
      {/* // Movemos el props.children para que se pueda emplear el componente hijo.
    // Para que js no de errores y pueda funcionar de manera correcta, es necesario el empleo de <>> </> para que no de error. */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto min-h-screen px-2 py-2">
          {props.children}
        </div>
      </div>
      {/* Nótese que este props children de esta manera lo que hace es que todo componente y todo aquello que no sea 
    declarado dentro del código del header sino que sea externo, no se vaya a incluir dentro del propio header y quede como
    independiente */}
    </>
  );
}
