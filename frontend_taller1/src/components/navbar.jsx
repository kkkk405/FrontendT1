import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Registrar Lectura',
            icon: 'pi pi-plus',
            command: () => navigate('/registrar-lectura')
        },
        {
            label: 'Mediciones Existentes',
            icon: 'pi pi-bolt',
            command: () => navigate('/mediciones-existentes')
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}
