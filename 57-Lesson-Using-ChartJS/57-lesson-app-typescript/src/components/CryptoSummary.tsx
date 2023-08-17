import {Crypto} from "../Types"
/*
  Cabe destacar que para este caso, debido a que lo que recibe nuestra función que creamos abajo recibe un tipo
  de dato que para nuestro programa sabemos de que tipo concreto de dato se trata, pues hacemos uso de la creación
  de un nuevo tipo de dato en vez de establecer que el tipo de dato que recibe la función es de tipo any, ya que
  esto nos podría generar errores posteriormente cuando nuestro código sea mucho más grande.

  Anotación: nótese que para el elemento de tipo crypto, en vez de declararlo como un tipo objeto, ya que este se
  trata de un objeto que nosotros ya conocemos, pues se declara como un tipo de otro tipo que ya existe en otro
  fichero que para este caso es el de App.
 */
export type AppProps = {
  crypto: Crypto;
};
/*
  Cabe destacar que a continuación en vez de hacer uso de props como en el caso de javascript cuando creamos un
  nuevo componente, pues para este caso lo declaramos como un elemento haciendo uso de {example}, así
  no hace falta hacer uso para este caso de props.crypto.name, sino que directamente podemos hacer uso de crypto.

  NOTA: para determinar el tipo de salida que tiene la función, como en este caso se trata de un elemento, ya que
  esta función sirve para crear componentes, pues se debe de establecer que la salida para este caso es del tipo
  JSX.Element
*/
export default function CryptoSummary({crypto} : AppProps): JSX.Element {
  return <p>{crypto.name + ' $' + crypto.current_price}</p>
};