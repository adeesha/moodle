/* YUI 3.9.0 (build 5827) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add('tree-openable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that adds the concept of open/closed state for nodes.

@module tree
@submodule tree-openable
@main tree-openable
**/

/**
Extension for `Tree` that adds the concept of open/closed state for nodes.

@class Tree.Openable
@constructor
@extensionfor Tree
**/

/**
Fired when a node is closed.

@event close
@param {Tree.Node} node Node being closed.
@preventable _defCloseFn
**/
var EVT_CLOSE = 'close';

/**
Fired when a node is opened.

@event open
@param {Tree.Node} node Node being opened.
@preventable _defOpenFn
**/
var EVT_OPEN = 'open';

function Openable() {}

Openable.prototype = {
    // -- Lifecycle ------------------------------------------------------------
    initializer: function () {
        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Openable);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Closes the specified node if it isn't already closed.

    @method closeNode
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `close` event
            will be suppressed.
    @chainable
    **/
    closeNode: function (node, options) {
        if (node.canHaveChildren && node.isOpen()) {
            this._fireTreeEvent(EVT_CLOSE, {node: node}, {
                defaultFn: this._defCloseFn,
                silent   : options && options.silent
            });
        }

        return this;
    },

    /**
    Opens the specified node if it isn't already open.

    @method openNode
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `open` event
            will be suppressed.
    @chainable
    **/
    openNode: function (node, options) {
        if (node.canHaveChildren && !node.isOpen()) {
            this._fireTreeEvent(EVT_OPEN, {node: node}, {
                defaultFn: this._defOpenFn,
                silent   : options && options.silent
            });
        }

        return this;
    },

    /**
    Toggles the open/closed state of the specified node, closing it if it's
    currently open or opening it if it's currently closed.

    @method toggleOpenNode
    @param {Tree.Node} node Node to toggle.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, events will be
            suppressed.
    @chainable
    **/
    toggleOpenNode: function (node, options) {
        return node.isOpen() ? this.closeNode(node, options) :
            this.openNode(node, options);
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default handler for the `close` event.

    @method _defCloseFn
    @param {EventFacade} e
    @protected
    **/
    _defCloseFn: function (e) {
        delete e.node.state.open;
    },

    /**
    Default handler for the `open` event.

    @method _defOpenFn
    @param {EventFacade} e
    @protected
    **/
    _defOpenFn: function (e) {
        e.node.state.open = true;
    }
};

Y.Tree.Openable = Openable;
/**
@module tree
@submodule tree-openable
**/

/**
`Tree.Node` extension that adds methods useful for nodes in trees that use the
`Tree.Openable` extension.

@class Tree.Node.Openable
@constructor
@extensionfor Tree.Node
**/

function NodeOpenable() {}

NodeOpenable.prototype = {
    /**
    Closes this node if it's currently open.

    @method close
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `close` event
            will be suppressed.
    @chainable
    **/
    close: function (options) {
        this.tree.closeNode(this, options);
        return this;
    },

    /**
    Returns `true` if this node is currently open.

    Note: the root node of a tree is always considered to be open.

    @method isOpen
    @return {Boolean} `true` if this node is currently open, `false` otherwise.
    **/
    isOpen: function () {
        return !!this.state.open || this.isRoot();
    },

    /**
    Opens this node if it's currently closed.

    @method open
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `open` event
            will be suppressed.
    @chainable
    **/
    open: function (options) {
        this.tree.openNode(this, options);
        return this;
    },

    /**
    Toggles the open/closed state of this node, closing it if it's currently
    open or opening it if it's currently closed.

    @method toggleOpen
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, events will be
            suppressed.
    @chainable
    **/
    toggleOpen: function (options) {
        this.tree.toggleOpenNode(this, options);
        return this;
    }
};

Y.Tree.Node.Openable = NodeOpenable;


}, '3.9.0', {"requires": ["tree"]});
