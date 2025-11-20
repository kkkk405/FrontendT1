import { Menubar } from 'primereact/menubar';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BarraNavegacion() {
    const navegar = useNavigate();
    const ubicacion = useLocation();

    const opcionesMenu = [
        {
            label: 'Registrar Lectura',
            icon: 'pi pi-plus',
            command: () => navegar('/registrar-lectura'),
            template: (item, options) => (
                <a
                    className={`p-menuitem-link ${ubicacion.pathname === '/registrar-lectura' ? 'active-navbar-item' : ''}`}
                    onClick={options.onClick}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <span className={item.icon} />
                    <span className="ms-2">{item.label}</span>
                </a>
            )
        },
        {
            label: 'Mediciones Existentes',
            icon: 'pi pi-bolt',
            command: () => navegar('/mediciones-existentes'),
            template: (item, options) => (
                <a
                    className={`p-menuitem-link ${ubicacion.pathname === '/mediciones-existentes' ? 'active-navbar-item' : ''}`}
                    onClick={options.onClick}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <span className={item.icon} />
                    <span className="ms-2">{item.label}</span>
                </a>
            )
        }
    ];

    const inicio = (
        <span className="navbar-marca fw-bold fs-4 ms-2" style={{ color: '#2c3e50' }}>
            Sanquinta
        </span>
    );

    return (
        <div className="card p-0">
            <div className="d-flex align-items-center" style={{ minHeight: '56px' }}>
                <Menubar model={opcionesMenu} start={inicio} className="w-100 barra-menubar" />
            </div>
        </div>
    );
}