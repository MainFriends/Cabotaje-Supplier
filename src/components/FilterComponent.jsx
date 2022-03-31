const FilterComponent = ({ filterText, onFilter}) => (
	<>
		<input
			id="search"
            className='form-control form-control-sm filterInput'
			type="text"
			placeholder="Buscar cliente"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}>
		</input>
	</>
);

export default FilterComponent