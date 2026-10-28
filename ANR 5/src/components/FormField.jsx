export default function FormField({ label, name, register, errors, type = 'text', children, ...props }) {
  const error = errors[name];
  const id = props.id ?? name;
  const fieldProps = { id, ...register(name), 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined, ...props };
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {type === 'select' ? <select {...fieldProps}>{children}</select>
        : type === 'textarea' ? <textarea {...fieldProps} rows={3} />
          : <input type={type} {...fieldProps} />}
      {error && <p className="field-error" id={`${id}-error`} role="alert">{error.message}</p>}
    </div>
  );
}
