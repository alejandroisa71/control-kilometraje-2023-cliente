import React from 'react'
import ListadoVehiculos from '../vehiculos/ListadoVehiculos'
import NuevoVehiculo from '../vehiculos/NuevoVehiculo'

const Sidebar = () => {
  return (
    <aside>
      <h1>Kilometraje<span>App</span></h1>

      <NuevoVehiculo/>

      <div className="vehiculos">
        <h2>Vehiculos</h2>

        <ListadoVehiculos/>
      </div>
    </aside>
  )
}

export default Sidebar