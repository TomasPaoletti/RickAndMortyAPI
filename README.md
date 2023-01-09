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
- Transferencias entre usuarios en tiempo real
- Retiro de dinero
- Pedir un prestamo
- Hacer un pago de la cuota del prestamo pedido

## Tecnologías implementadas:

- HTML
- CSS
- React.js
- Bootstrap-React
- Firebase
- React-Icons
- Uiball/loaders
- SweetAlert2
