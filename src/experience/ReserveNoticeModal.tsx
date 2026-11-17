/*
 * ReserveNoticeModal.tsx — Aviso de «Reserva no disponible».
 *
 * Para qué sirve: ventana emergente que explica que este MVP todavía no permite reservar.
 * Responsabilidad: mostrar el aviso y cerrarse; no guarda nada ni simula reservas.
 * Usa y se relaciona con: Modal y Button de Mantine (@mantine/core), que necesitan el
 * MantineProvider de main.tsx. Lo abre experience/ExperienceDetailPage.tsx con «Reservar».
 * Concepto React: componente controlado por el padre: recibe `opened` y `onClose` por
 * props y no tiene estado propio.
 */
import { Button, Modal } from '@mantine/core'

type ReserveNoticeModalProps = {
  opened: boolean
  onClose: () => void
}

/** Aviso informativo: este MVP no crea ni simula reservas (CU-05/CU-06 quedan fuera). */
export function ReserveNoticeModal({ opened, onClose }: ReserveNoticeModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Reserva no disponible" centered radius="lg">
      <p className="modal-text">
        La reserva todavía no está disponible en esta demostración. Este MVP solo muestra el catálogo
        y el detalle con datos simulados.
      </p>
      <Button onClick={onClose} fullWidth color="#7C3CFF">
        Entendido
      </Button>
    </Modal>
  )
}
