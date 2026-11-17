/*
 * InterestFormModal.tsx — Formulario demostrativo «Me interesa».
 *
 * Para qué sirve: ventana emergente con un pequeño formulario (nombre, correo y plazas de
 * interés) para practicar validación de formularios. Es solo una demostración.
 * Responsabilidad: validar los datos en el navegador y mostrar una confirmación local. No envía
 * nada (sin fetch), no guarda nada (sin localStorage) y no cambia plazas ni datos simulados.
 * Usa y se relaciona con: Modal, TextInput, NativeSelect y Button de @mantine/core; useForm y
 * schemaResolver de @mantine/form; el esquema Zod de interestSchema.ts. Lo abre
 * experience/ExperienceDetailPage.tsx con el botón «Me interesa».
 * Concepto React: el padre controla si el modal está abierto (`opened`/`onClose`); este
 * componente guarda con useState si ya se mostró la confirmación, y useForm guarda los
 * valores y errores de los campos.
 */
import { useState } from 'react'
import { Button, Modal, NativeSelect, Stack, TextInput } from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { interestSchema, SEAT_OPTIONS, type InterestValues } from './interestSchema.ts'

type InterestFormModalProps = {
  opened: boolean
  onClose: () => void
  experienceName: string
}

/** Valores con los que empieza (y vuelve a empezar) el formulario. */
const INITIAL_VALUES: InterestValues = { name: '', email: '', seats: '1' }

/** Modal con el formulario de interés; la confirmación es local y no registra nada. */
export function InterestFormModal({ opened, onClose, experienceName }: InterestFormModalProps) {
  // Estado local: valores aceptados tras validar (null = todavía se muestra el formulario).
  const [submitted, setSubmitted] = useState<InterestValues | null>(null)

  // useForm guarda valores y errores; schemaResolver traduce los errores de Zod a cada campo.
  // sync: true → la validación es inmediata (Zod no tiene reglas asíncronas aquí).
  // validateInputOnBlur: al salir de un campo se valida solo ese campo.
  const form = useForm<InterestValues>({
    initialValues: INITIAL_VALUES,
    validate: schemaResolver(interestSchema, { sync: true }),
    validateInputOnBlur: true,
  })

  /** Vuelve al formulario vacío: valores iniciales, sin errores y sin confirmación. */
  const startOver = () => {
    form.reset()
    setSubmitted(null)
  }

  /** Cerrar (botón, Escape o clic fuera) también reinicia, para que reabrir empiece limpio. */
  const handleClose = () => {
    startOver()
    onClose()
  }

  /** Solo se llama si Zod no encontró errores; guarda los valores en memoria para mostrarlos. */
  const handleValidSubmit = (values: InterestValues) => {
    setSubmitted(values)
  }

  const seatsLabel = submitted?.seats === '1' ? '1 plaza' : `${submitted?.seats} plazas`

  return (
    <Modal opened={opened} onClose={handleClose} title="Me interesa esta experiencia" centered radius="lg">
      {submitted ? (
        <div role="status" className="interest-confirmation">
          <h3 className="interest-confirmation__title">Datos comprobados</h3>
          <p className="modal-text">
            Gracias, {submitted.name.trim()}. El formulario es correcto: {submitted.email.trim()}, {seatsLabel} para
            «{experienceName}».
          </p>
          <p className="modal-text interest-confirmation__demo">
            Esto es una demostración: tus datos no se enviaron ni se guardaron en ningún sitio, y nadie se pondrá en
            contacto contigo.
          </p>
          <div className="interest-confirmation__actions">
            <Button variant="default" onClick={startOver}>
              Volver a empezar
            </Button>
            <Button onClick={handleClose} color="#7C3CFF">
              Cerrar
            </Button>
          </div>
        </div>
      ) : (
        // noValidate: el navegador no valida por su cuenta; los mensajes salen solo de Zod.
        <form noValidate className="interest-form" onSubmit={form.onSubmit(handleValidSubmit)}>
          <Stack gap="md">
            <p className="modal-text interest-form__notice">
              Formulario de demostración: tus datos no se guardan ni se envían.
            </p>
            <TextInput label="Nombre" withAsterisk autoComplete="name" {...form.getInputProps('name')} />
            <TextInput
              type="email"
              label="Correo electrónico"
              withAsterisk
              autoComplete="email"
              {...form.getInputProps('email')}
            />
            <NativeSelect label="Plazas de interés" data={[...SEAT_OPTIONS]} {...form.getInputProps('seats')} />
            <Button type="submit" fullWidth color="#7C3CFF">
              Comprobar datos
            </Button>
          </Stack>
        </form>
      )}
    </Modal>
  )
}
