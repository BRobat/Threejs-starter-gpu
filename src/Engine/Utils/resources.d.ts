/**
 * Resources class.
 *
 * @export
 * @class Resources
 */
export default class Resources extends EventEmitter {
    /**
   * Adds a callback to be triggered when a specific event is emitted.
   *
   * @param {_names: string} _names The name of the event(s) to listen to.
   * @param {callback: function} callback The function to call when the event is emitted.
   * @returns {EventEmitter} This instance for chaining.
   */
    on(_names: string, callback: Function): EventEmitter;

    /**
     * Removes a callback from being triggered when a specific event is emitted.
     *
     * @param {_names: string} _names The name of the event(s) to stop listening to.
     * @returns {EventEmitter} This instance for chaining.
     */
    off(_names: string): EventEmitter;

    /**
     * Triggers one or more callbacks when a specific event is emitted.
     *
     * @param {_name: string} _name The name of the event to trigger.
     * @param {_args: any[]} [_args] The arguments to pass to the callback(s).
     * @returns {*} The result of calling the callback(s), or null if none are found.
     */
    trigger(_name: string, _args?: any[]): any;

    /**
     * Resolves a name into a namespace and value.
     *
     * @param {string} _names The name to resolve.
     * @returns {string[]} An array of names with the namespace and value resolved.
     */
    resolveNames(_names: string): string[];

    /**
     * Resolves a name into its namespace and value.
     *
     * @param {string} name The name to resolve.
     * @returns {{original: string, value: string, namespace: string}} An object with the original name, resolved namespace, and value.
     */
    resolveName(name: string): { original: string; value: string; namespace: string };
    /**
     * Creates an instance of Resources.
     *
     * @param {sources: Array<{type: string, path: string, name: string}>} sources The resources to load.
     */
    constructor(sources: Array<{ type: string; path: string, name: string }>) {
        super();
    }

    /**
     * Sets up the loaders for loading different types of resources.
     *
     * @private
     */
    setLoaders(): void;

    /**
     * Starts the loading process by calling the load method on each source.
     *
     * @private
     */
    startLoading(): void;

    /**
     * Loads a specific resource using the corresponding loader.
     *
     * @param {source} source The source to load.
     * @param {file} file The loaded file.
     * @private
     */
    sourceLoaded(source: any, file: any): void;
}