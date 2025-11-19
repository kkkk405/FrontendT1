import { Menubar } from 'primereact/menubar';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            label: 'Registrar Lectura',
            icon: 'pi pi-plus',
            command: () => navigate('/registrar-lectura'),
            className: location.pathname === '/registrar-lectura' ? 'active-navbar-item' : ''
        },
        {
            label: 'Mediciones Existentes',
            icon: 'pi pi-bolt',
            command: () => navigate('/mediciones-existentes'),
            className: location.pathname === '/mediciones-existentes' ? 'active-navbar-item' : ''
        }
    ];

    const start = (
        <span className="navbar-brand fw-bold fs-4 ms-2" style={{ color: '#2c3e50' }}>
            Sanquinta
        </span>
    );

    return (
        <div className="card p-0">
            <div className="d-flex align-items-center" style={{ minHeight: '56px' }}>
                <Menubar model={items} start={start} className="w-100 p-menubar" />
            </div>
        </div>
    );
}
