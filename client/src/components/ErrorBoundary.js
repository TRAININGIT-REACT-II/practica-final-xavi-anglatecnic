import React from "react";

/**
 * Este componente necesita ser de tipo clase, ya que no existen ningún comportamiento
 * similar en hooks.
 */
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);

		this.state = {
			error: false
		};
	}

	/**
	 * Este método se ejecuta en la fase de "render". Permite actualizar el estado
	 * durante el proceso de reconciliación.
	 *
	 * El objetivo de este método es modificar el estado para mostrar renderizar un
	 * mensaje de error u otro componente en la interfaz
	 */
	static getDerivedStateFromError() {
		return {
			error: true
		};
	}

	/**
	 * Este método se ejecuta durante la fase de commit. Se utiliza para acciones
	 * posteriores a la recuperación del error como enviar este y su traza a
	 * servicios externos como Airbrake o Sentry
	 */
	componentDidCatch(error, info) {
		console.log(error, info);
	}

	/**
	 * Llama al método onReset que recibe por las propiedades y reinicia el error
	 */
	onClick() {
		this.props.onReset();
		this.setState({ error: false });
	}

	render() {
		// Si ha habido un error, mostramos el mensaje y un botón para reiniciar el estado
		if (this.state.error === true) {
			return (
				<section aria-label="Hubo un error en la aplicacion">
					<h1>{this.props.message}</h1>
					<button onClick={this.onClick}>Reintentar</button>
				</section>
			);
		}

		// Si no hay errores, mostramos los nodos descendientes
		return this.props.children;
	}
}

export default ErrorBoundary;