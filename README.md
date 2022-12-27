# Prueba técnica

## Descripción del proyecto:
Aplicación que simula un módulo de gestión de cuentas bancarias de cada uno de los usuarios de la API Rick And Morty donde cada uno podría hacer depósitos, retiros, transferencias y pagar cuotas mensuales

## ¿Cómo se toman los datos?
Se realizó una petición a la API para extraer el id y el nombre de cada personaje. Luego, se transformó en un objeto JavaScript para agregarle el dinero en cuenta a cada uno. Y por último ese objeto se transformó en un JSON para luego modificarlo cada vez que se realizaba un movimiento en la cuenta de cada usuario

## Funcionalidades:
- Login y register mediante email y redes sociales utilizando Firestore
- Logout
- Manejo de errores para el login y el register
- Ver en tiempo real el dinero que posee cada usuario de la API Rick and Morty
- Realizar depósitos en las cuentas personales de cada uno de los usuarios

## Funcionalidades a futuro:
Por falta de tiempo no pude realizar todas las consignas de la prueba, me basé en hacer primero lo más importante y poder darle funcionalidad a la aplicación.
Si hubiera dispuesto de más tiempo hubiera realizado las siguientes funcionalidades:
- Transferencias entre usuarios realizando introduciendo el importe en un input y seleccionando al usuario que se desea transferir mediante un select y así tomar el id del mismo
- Retiro de dinero mediante un input donde se le restaría al dinero en la cuenta
- Pedir un préstamo mediante un input donde se le sumaría el dinero a la cuenta
- Hacer un pago mensual mediante un input y se le restaría el dinero de la cuenta
- Notificaciones en tiempo real cuando se realice un movimiento
- Mejorar el diseño para que sea más agradable
