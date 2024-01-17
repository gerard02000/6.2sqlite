import Form from "@/components/FormProveedor"
import { db } from "@/lib/mysql"
import { deleteProveedor } from "@/lib/actions"

async function page({ searchParams }) {
  const [proveedor] = await db.query('select * from proveedores where id = ?', [searchParams.id]);
  return (
    <div>
      <h3>Eliminar artículo {searchParams.id}</h3>
      <Form action={deleteProveedor} title='Eliminar proveedor' proveedor={proveedor} disabled={true} />
    </div>
  )
}

export default page