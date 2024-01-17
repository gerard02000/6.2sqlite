import Form from "@/components/FormProveedor"
import { newProveedor } from "@/lib/actions"

function page() {
  return (
    <div>
      <h3>Nuevo Porveedor</h3>
      <Form action={newProveedor} title='Crear artículo' articulo={null} disabled={false} />
    </div>
  )
}

export default page