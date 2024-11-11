import * as yup from 'yup';


const VEHICLE_TYPES = ['carro', 'moto'];

export const signupSchema = yup.object().shape({
    nombre: yup
        .string()
        .required('El nombre es requerido')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras'),

    apellido: yup
        .string()
        .required('El apellido es requerido')
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .matches(/^[a-zA-Z\s]+$/, 'El apellido solo puede contener letras'),

    correo: yup
        .string()
        .required('El correo es requerido')
        .email('Ingrese un correo válido')
        .matches(
            /@correounivalle\.edu\.co$/,
            'Debe usar un correo institucional (@correounivalle.edu.co)'
        )
        .lowercase(),

    codigo: yup
        .string()
        .required('El código estudiantil es requerido')
        .matches(/^\d+$/, 'El código debe contener solo números')
        .min(6, 'El código debe tener al menos 6 dígitos')
        .max(10, 'El código no puede tener más de 10 dígitos'),

    password: yup
        .string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)/,
            'La contraseña debe contener al menos una letra y un número'
        ),

    confirmarPassword: yup
        .string()
        .required('Debe confirmar la contraseña')
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),

    placa: yup.string().when('$isConductor', {
        is: true,
        then: () => yup
            .string()
            .required('La placa del vehículo es requerida')
            .min(6, 'La placa debe tener al menos 6 caracteres'),
        otherwise: () => yup.string().nullable()
    }),

    tipoVehiculo: yup.string().when('$isConductor', {
        is: true,
        then: () => yup
            .string()
            .required('El tipo de vehículo es requerido')
            .oneOf(VEHICLE_TYPES, 'Seleccione un tipo de vehículo válido (carro o moto)'),
        otherwise: () => yup.string().nullable()
    })
}).required();

export const loginSchema = yup.object().shape({
    correo: yup
        .string()
        .required('El correo es requerido')
        .email('Ingrese un correo válido')
        .matches(
            /@correounivalle\.edu\.co$/,
            'Debe usar un correo institucional (@correounivalle.edu.co)'
        ),
    password: yup
        .string()
        .required('La contraseña es requerida')
});

export const tripSchema = yup.object().shape({
    nombreConductor: yup.string().required('El nombre del conductor es requerido'),
    lugarDestino: yup.string().required('El lugar de destino es requerido'),
    lugarPartida: yup.string().required('El lugar de partida es requerido'),
    horaPartida: yup.string().required('La hora de partida es requerida'),
    costo: yup.number().required('El costo es requerido').positive('El costo debe ser positivo'),
    numeroCupos: yup.number().required('El número de cupos es requerido').positive('El número debe ser positivo').integer('Debe ser un número entero')
});
