import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { useState, useRef } from 'react';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { addMedicion } from '../services/MedicionService';
import { useNavigate } from 'react-router-dom';

function getMedidorOptions() {
    const options = [];
    for (let i = 1; i <= 10; i++) {
        const value = i.toString().padStart(2, '0');
        options.push({ label: value, value });
    }
    return options;
}

const medidorOptions = getMedidorOptions();

const RegistrarLectura = () => {
    const [calendario, setCalendario] = useState(null);
    const [medidor, setMedidor] = useState(null);
    const [texto, setTexto] = useState('');
    const [valor, setValor] = useState(null);
    const [medida, setMedida] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleRegistrar = () => {
        // Validaciones
        let errores = [];
        if (!calendario) errores.push('Debe seleccionar la fecha y hora.');
        if (!medidor) errores.push('Debe seleccionar el medidor.');
        if (!texto || texto.trim() === '' || texto === '<p><br></p>') errores.push('Debe ingresar la dirección.');
        if (valor === null || valor <= 9 || valor > 500) errores.push('El valor debe ser mayor que 9 y menor o igual a 500.');
        if (!medida) errores.push('Debe seleccionar el tipo de medida.');

        if (errores.length > 0) {
            toast.current.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: errores.join(' '),
                life: 4000
            });
            return;
        }

        // Formato de fecha y hora
        const d = calendario;
        const day = String(d.getDate()).padStart(2, '0');
        const month = d.toLocaleString('es-ES', { month: 'long' });
        const year = String(d.getFullYear());
        const fecha = `${day}-${month}-${year}`;
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const hora = `${hours}:${minutes}`;

        const nuevaLectura = {
            id: Date.now(),
            fecha,
            hora,
            medidor,
            direccion: texto,
            valor,
            tipo: medida
        };
        addMedicion(nuevaLectura);

        toast.current.show({
            severity: 'success',
            summary: 'Lectura registrada',
            detail: 'La lectura se ha registrado exitosamente.',
            life: 2000
        });

        setTimeout(() => {
            navigate('/mediciones-existentes');
        }, 2000);
    };

    return (
        <div className="container mt-4">
            <Toast ref={toast} />
            <Panel header="Registrar Lectura" className="p-fluid">
                <div className="flex-auto mb-3">
                    <label htmlFor="calendario" className="font-bold mb-2 d-block">
                        Fecha y hora
                    </label>
                    <Calendar
                        id="calendario"
                        value={calendario}
                        onChange={(e) => setCalendario(e.value)}
                        showIcon
                        showTime
                        dateFormat="dd-MM-yy"
                        hourFormat="24"
                        inputClassName="w-100"
                        className="calendar-rounded-icon"
                        placeholder='Seleccione fecha y hora'
                    />
                </div>
                <div className="flex-auto mb-3">
                    <label htmlFor="medidor" className="font-bold mb-2 d-block">
                        Medidor
                    </label>
                    <Dropdown
                        id="medidor"
                        value={medidor}
                        options={medidorOptions}
                        onChange={(e) => setMedidor(e.value)}
                        placeholder="Seleccione un medidor"
                        className="w-100"
                    />
                </div>
                <div className="flex-auto mb-3">
                    <label htmlFor="direccion" className="font-bold mb-2 d-block">
                        Dirección
                    </label>
                    <Editor
                        id="direccion"
                        value={texto}
                        onTextChange={(e) => setTexto(e.htmlValue)}
                        style={{ height: '50px' }}
                        placeholder='Ingrese la dirección'
                    />
                </div>
                <div className="flex-auto mb-3">
                    <label htmlFor="valor" className="font-bold mb-2 d-block">
                        Valor
                    </label>
                    <InputNumber
                        id="valor"
                        value={valor}
                        onValueChange={(e) => setValor(e.value)}
                        placeholder='Ingrese el valor'
                        min={10}
                        max={500}
                    />
                </div>
                <div className="flex-auto mb-3">
                    <label htmlFor="tipo-medida" className="font-bold mb-2 d-block">
                        Tipo de medida
                    </label>
                    <div className="d-flex gap-3 flex-row mt-3">
                        <div className="d-flex align-items-center">
                            <RadioButton inputId="medida1" name="medida" value="Kilowatts" onChange={(e) => setMedida(e.value)} checked={medida === 'Kilowatts'} />
                            <label htmlFor="medida1" className="ms-2">Kilowatts</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <RadioButton inputId="medida2" name="medida" value="Watts" onChange={(e) => setMedida(e.value)} checked={medida === 'Watts'} />
                            <label htmlFor="medida2" className="ms-2">Watts</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <RadioButton inputId="medida3" name="medida" value="Temperatura" onChange={(e) => setMedida(e.value)} checked={medida === 'Temperatura'} />
                            <label htmlFor="medida3" className="ms-2">Temperatura</label>
                        </div>
                    </div>
                </div>
                <div className="flex-auto mt-5">
                    <Button label="Registrar Lectura" className='rounded' onClick={handleRegistrar} />
                </div>
            </Panel>
        </div>
    );
};

export default RegistrarLectura;
