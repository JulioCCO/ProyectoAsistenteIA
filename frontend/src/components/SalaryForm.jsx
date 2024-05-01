import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Select from "react-select";
// eslint-disable-next-line react/prop-types
const SalaryForm = ({ isOpen, onClose, handleInputChange }) => {
  const jobOptions = [
    { value: '0', label: 'Account Manager' },
    { value: '1', label: 'Accountant' },
    { value: '2', label: 'Administrative Assistant' },
    { value: '3', label: 'Business Analyst' },
    { value: '4', label: 'Business Development Manager' },
    { value: '5', label: 'Business Intelligence Analyst' },
    { value: '6', label: 'CEO' },
    { value: '7', label: 'Chief Data Officer' },
    { value: '8', label: 'Chief Technology Officer' },
    { value: '9', label: 'Content Marketing Manager' },
    { value: '10', label: 'Copywriter' },
    { value: '11', label: 'Creative Director' },
    { value: '12', label: 'Customer Service Manager' },
    { value: '13', label: 'Customer Service Rep' },
    { value: '14', label: 'Customer Service Representative' },
    { value: '15', label: 'Customer Success Manager' },
    { value: '16', label: 'Customer Success Rep' },
    { value: '17', label: 'Data Analyst' },
    { value: '18', label: 'Data Entry Clerk' },
    { value: '19', label: 'Data Scientist' },
    { value: '20', label: 'Digital Content Producer' },
    { value: '21', label: 'Digital Marketing Manager' },
    { value: '22', label: 'Director' },
    { value: '23', label: 'Director of Business Development' },
    { value: '24', label: 'Director of Engineering' },
    { value: '25', label: 'Director of Finance' },
    { value: '26', label: 'Director of HR' },
    { value: '27', label: 'Director of Human Capital' },
    { value: '28', label: 'Director of Human Resources' },
    { value: '29', label: 'Director of Marketing' },
    { value: '30', label: 'Director of Operations' },
    { value: '31', label: 'Director of Product Management' },
    { value: '32', label: 'Director of Sales' },
    { value: '33', label: 'Director of Sales and Marketing' },
    { value: '34', label: 'Event Coordinator' },
    { value: '35', label: 'Financial Advisor' },
    { value: '36', label: 'Financial Analyst' },
    { value: '37', label: 'Financial Manager' },
    { value: '38', label: 'Graphic Designer' },
    { value: '39', label: 'HR Generalist' },
    { value: '40', label: 'HR Manager' },
    { value: '41', label: 'Help Desk Analyst' },
    { value: '42', label: 'Human Resources Director' },
    { value: '43', label: 'IT Manager' },
    { value: '44', label: 'IT Support' },
    { value: '45', label: 'IT Support Specialist' },
    { value: '46', label: 'Junior Account Manager' },
    { value: '47', label: 'Junior Accountant' },
    { value: '48', label: 'Junior Advertising Coordinator' },
    { value: '49', label: 'Junior Business Analyst' },
    { value: '50', label: 'Junior Business Development Associate' },
    { value: '51', label: 'Junior Business Operations Analyst' },
    { value: '52', label: 'Junior Copywriter' },
    { value: '53', label: 'Junior Customer Support Specialist' },
    { value: '54', label: 'Junior Data Analyst' },
    { value: '55', label: 'Junior Data Scientist' },
    { value: '56', label: 'Junior Designer' },
    { value: '57', label: 'Junior Developer' },
    { value: '58', label: 'Junior Financial Advisor' },
    { value: '59', label: 'Junior Financial Analyst' },
    { value: '60', label: 'Junior HR Coordinator' },
    { value: '61', label: 'Junior HR Generalist' },
    { value: '62', label: 'Junior Marketing Analyst' },
    { value: '63', label: 'Junior Marketing Coordinator' },
    { value: '64', label: 'Junior Marketing Manager' },
    { value: '65', label: 'Junior Marketing Specialist' },
    { value: '66', label: 'Junior Operations Analyst' },
    { value: '67', label: 'Junior Operations Coordinator' },
    { value: '68', label: 'Junior Operations Manager' },
    { value: '69', label: 'Junior Product Manager' },
    { value: '70', label: 'Junior Project Manager' },
    { value: '71', label: 'Junior Recruiter' },
    { value: '72', label: 'Junior Research Scientist' },
    { value: '73', label: 'Junior Sales Representative' },
    { value: '74', label: 'Junior Social Media Manager' },
    { value: '75', label: 'Junior Social Media Specialist' },
    { value: '76', label: 'Junior Software Developer' },
    { value: '77', label: 'Junior Software Engineer' },
    { value: '78', label: 'Junior UX Designer' },
    { value: '79', label: 'Junior Web Designer' },
    { value: '80', label: 'Junior Web Developer' },
    { value: '81', label: 'Marketing Analyst' },
    { value: '82', label: 'Marketing Coordinator' },
    { value: '83', label: 'Marketing Manager' },
    { value: '84', label: 'Marketing Specialist' },
    { value: '85', label: 'Network Engineer' },
    { value: '86', label: 'Office Manager' },
    { value: '87', label: 'Operations Analyst' },
    { value: '88', label: 'Operations Director' },
    { value: '89', label: 'Operations Manager' },
    { value: '90', label: 'Principal Engineer' },
    { value: '91', label: 'Principal Scientist' },
    { value: '92', label: 'Product Designer' },
    { value: '93', label: 'Product Manager' },
    { value: '94', label: 'Product Marketing Manager' },
    { value: '95', label: 'Project Engineer' },
    { value: '96', label: 'Project Manager' },
    { value: '97', label: 'Public Relations Manager' },
    { value: '98', label: 'Recruiter' },
    { value: '99', label: 'Research Director' },
    { value: '100', label: 'Research Scientist' },
    { value: '101', label: 'Sales Associate' },
    { value: '102', label: 'Sales Director' },
    { value: '103', label: 'Sales Executive' },
    { value: '104', label: 'Sales Manager' },
    { value: '105', label: 'Sales Operations Manager' },
    { value: '106', label: 'Sales Representative' },
    { value: '107', label: 'Senior Account Executive' },
    { value: '108', label: 'Senior Account Manager' },
    { value: '109', label: 'Senior Accountant' },
    { value: '110', label: 'Senior Business Analyst' },
    { value: '111', label: 'Senior Business Development Manager' },
    { value: '112', label: 'Senior Consultant' },
    { value: '113', label: 'Senior Data Analyst' },
    { value: '114', label: 'Senior Data Engineer' },
    { value: '115', label: 'Senior Data Scientist' },
    { value: '116', label: 'Senior Engineer' },
    { value: '117', label: 'Senior Financial Advisor' },
    { value: '118', label: 'Senior Financial Analyst' },
    { value: '119', label: 'Senior Financial Manager' },
    { value: '120', label: 'Senior Graphic Designer' },
    { value: '121', label: 'Senior HR Generalist' },
    { value: '122', label: 'Senior HR Manager' },
    { value: '123', label: 'Senior HR Specialist' },
    { value: '124', label: 'Senior Human Resources Coordinator' },
    { value: '125', label: 'Senior Human Resources Manager' },
    { value: '126', label: 'Senior Human Resources Specialist' },
    { value: '127', label: 'Senior IT Consultant' },
    { value: '128', label: 'Senior IT Project Manager' },
    { value: '129', label: 'Senior IT Support Specialist' },
    { value: '130', label: 'Senior Manager' },
    { value: '131', label: 'Senior Marketing Analyst' },
    { value: '132', label: 'Senior Marketing Coordinator' },
    { value: '133', label: 'Senior Marketing Director' },
    { value: '134', label: 'Senior Marketing Manager' },
    { value: '135', label: 'Senior Marketing Specialist' },
    { value: '136', label: 'Senior Operations Analyst' },
    { value: '137', label: 'Senior Operations Coordinator' },
    { value: '138', label: 'Senior Operations Manager' },
    { value: '139', label: 'Senior Product Designer' },
    { value: '140', label: 'Senior Product Development Manager' },
    { value: '141', label: 'Senior Product Manager' },
    { value: '142', label: 'Senior Product Marketing Manager' },
    { value: '143', label: 'Senior Project Coordinator' },
    { value: '144', label: 'Senior Project Manager' },
    { value: '145', label: 'Senior Quality Assurance Analyst' },
    { value: '146', label: 'Senior Research Scientist' },
    { value: '147', label: 'Senior Researcher' },
    { value: '148', label: 'Senior Sales Manager' },
    { value: '149', label: 'Senior Sales Representative' },
    { value: '150', label: 'Senior Scientist' },
    { value: '151', label: 'Senior Software Architect' },
    { value: '152', label: 'Senior Software Developer' },
    { value: '153', label: 'Senior Software Engineer' },
    { value: '154', label: 'Senior Training Specialist' },
    { value: '155', label: 'Senior UX Designer' },
    { value: '156', label: 'Social Media Manager' },
    { value: '157', label: 'Social Media Specialist' },
    { value: '158', label: 'Software Developer' },
    { value: '159', label: 'Software Engineer' },
    { value: '160', label: 'Software Manager' },
    { value: '161', label: 'Software Project Manager' },
    { value: '162', label: 'Strategy Consultant' },
    { value: '163', label: 'Supply Chain Analyst' },
    { value: '164', label: 'Supply Chain Manager' },
    { value: '165', label: 'Technical Recruiter' },
    { value: '166', label: 'Technical Support Specialist' },
    { value: '167', label: 'Technical Writer' },
    { value: '168', label: 'Training Specialist' },
    { value: '169', label: 'UX Designer' },
    { value: '170', label: 'UX Researcher' },
    { value: '171', label: 'VP of Finance' },
    { value: '172', label: 'VP of Operations' },
    { value: '173', label: 'Web Developer' },
  ];

  const handleChange = (selectedOption) => {
    handleInputChange("job_title", selectedOption.value);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-5 inset-0 overflow-y-auto"
        onClose={onClose} // Función que se ejecuta cuando se cierra el modal
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/*Elemento que se muestra detrás del modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Este elemento sirve para engañar al navegador para que centre el contenido modal. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {/* Contenido principal del modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4   text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/3 sm:p-6">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                {/* Botón para cerrar el modal */}
                <button type="button" onClick={onClose}>
                  {/* Alinear el botón en la esquina superior derecha */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              {/* Título del modal */}
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                {"Predicción de salario de empleado"}
              </Dialog.Title>
              {/* Elemento input para la fecha de inicio */}
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="age"
              >
                Edad
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="text"
                placeholder="edad"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const formattedValue = parseFloat(
                    inputValue.replace(",", ".")
                  ); // Reemplaza comas por puntos para asegurar la interpretación decimal
                  const isValidNumber = !isNaN(formattedValue); // Verifica si es un número válido
                  const roundedValue = isValidNumber
                    ? formattedValue.toFixed(1)
                    : ""; // Redondea a dos decimales si es un número válido

                  handleInputChange("age", roundedValue);
                }} // Función que se ejecuta cuando se cambia el valor del input
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="gender"
              >
                Genero
              </label>
              <select
                id="gender" // Identificador del elemento
                name="gender" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("gender", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Mujer</option>
                <option value="1">Hombre</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="job_title"
              >
                Puesto de trabajo
              </label>
              <Select
                id="job_title"
                name="job_title"
                options={jobOptions}
                onChange={handleChange}
                placeholder="Seleccionar"
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="education_level"
              >
                Nivel de educacion
              </label>
              <select
                id="education_level" // Identificador del elemento
                name="education_level" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("education_level", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Bachillerato</option>
                <option value="1">Maestria</option>
                <option value="2">Doctorado</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="years_of_experience"
              >
                Años de experiencia
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="years_of_experience"
                type="text"
                placeholder="puntaje crediticio"
                onChange={(e) => {
                  handleInputChange("years_of_experience", e.target.value);
                }} // Función que se ejecuta cuando se cambia el valor del input
              />
              <div className="mt-5 sm:mt-6">
                {/* Botón para guardar la tarea */}
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose} // Función que se ejecuta cuando se hace click en el botón
                >
                  Guardar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default SalaryForm;
