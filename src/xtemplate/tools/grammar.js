x({

    productions: [
        {
            symbol: 'program',
            rhs: ['statements', 'inverse', 'statements'],
            action: function () {
                return new this.yy.ProgramNode(this.lexer.lineNumber, this.$1, this.$3);
            }
        },
        {
            symbol: 'program',
            rhs: ['statements'],
            action: function () {
                return new this.yy.ProgramNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'statements',
            rhs: ['statement'],
            action: function () {
                return [this.$1];
            }
        },
        {
            symbol: 'statements',
            rhs: ['statements', 'statement'],
            action: function () {
                this.$1.push(this.$2);
            }
        },
        {
            symbol: 'statement',
            rhs: ['openBlock', 'program', 'closeBlock'],
            action: function () {
                return new this.yy.BlockNode(this.lexer.lineNumber, this.$1, this.$2, this.$3);
            }
        },
        {
            symbol: 'statement',
            rhs: ['tpl']
        },
        {
            symbol: 'statement',
            rhs: ['CONTENT'],
            action: function () {
                return new this.yy.ContentNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'openBlock',
            rhs: ['OPEN_BLOCK', 'inTpl', 'CLOSE'],
            action: function () {
                return this.$2;
            }
        },
        {
            symbol: 'closeBlock',
            rhs: ['OPEN_END_BLOCK', 'path', 'CLOSE'],
            action: function () {
                return this.$2;
            }
        },
        {
            symbol: 'tpl',
            rhs: ['OPEN', 'inTpl', 'CLOSE'],
            action: function () {
                return this.$2;
            }
        },
        {
            symbol: 'tpl',
            rhs: ['OPEN_UN_ESCAPED', 'inTpl', 'CLOSE'],
            action: function () {
                this.$2.escaped = false;
                return this.$2;
            }
        },
        {
            symbol: 'inverse',
            rhs: ['OPEN_INVERSE', 'CLOSE']
        },
        {
            symbol: 'inTpl',
            rhs: ['path', 'params', 'hash'],
            action: function () {
                return new this.yy.TplNode(this.lexer.lineNumber, this.$1, this.$2, this.$3);
            }
        },
        {
            symbol: 'inTpl',
            rhs: ['path', 'params'],
            action: function () {
                return new this.yy.TplNode(this.lexer.lineNumber, this.$1, this.$2);
            }
        },
        {
            symbol: 'inTpl',
            rhs: ['path', 'hash'],
            action: function () {
                return new this.yy.TplNode(this.lexer.lineNumber, this.$1, null, this.$2);
            }
        },
        {
            symbol: 'inTpl',
            rhs: ['path'],
            action: function () {
                return new this.yy.TplNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'params',
            rhs: ['params', 'param'],
            action: function () {
                this.$1.push(this.$2);
            }
        },
        {
            symbol: 'params',
            rhs: ['param'],
            action: function () {
                return [this.$1];
            }
        },
        {
            symbol: 'param',
            rhs: ['path']
        },
        {
            symbol: 'param',
            rhs: ['STRING'],
            action: function () {
                return new this.yy.StringNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'param',
            rhs: ['NUMBER'],
            action: function () {
                return new this.yy.NumberNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'param',
            rhs: ['BOOLEAN'],
            action: function () {
                return new this.yy.BooleanNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'hash',
            rhs: ['hashSegments'],
            action: function () {
                return new this.yy.HashNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'hashSegments',
            rhs: ['hashSegments', 'hashSegment'],
            action: function () {
                this.$1.push(this.$2);
            }
        },
        {
            symbol: 'hashSegments',
            rhs: ['hashSegment'],
            action: function () {
                return [this.$1];
            }
        },
        {
            symbol: 'hashSegment',
            rhs: ['ID', 'EQUALS', 'path'],
            action: function () {
                return [this.$1, this.$3];
            }
        },
        {
            symbol: 'hashSegment',
            rhs: ['ID', 'EQUALS', 'STRING'],
            action: function () {
                return [this.$1, new this.yy.StringNode(this.lexer.lineNumber, this.$3)];
            }
        },
        {
            symbol: 'hashSegment',
            rhs: ['ID', 'EQUALS', 'NUMBER'],
            action: function () {
                return [this.$1, new this.yy.NumberNode(this.lexer.lineNumber, this.$3)];
            }
        },
        {
            symbol: 'hashSegment',
            rhs: ['ID', 'EQUALS', 'BOOLEAN'],
            action: function () {
                return [this.$1, new this.yy.BooleanNode(this.lexer.lineNumber, this.$3)];
            }
        },
        {
            symbol: 'path',
            rhs: ['pathSegments'],
            action: function () {
                return new this.yy.IdNode(this.lexer.lineNumber, this.$1);
            }
        },
        {
            symbol: 'pathSegments',
            rhs: ['pathSegments', 'SEP', 'ID'],
            action: function () {
                this.$1.push(this.$3);
            }
        },
        {
            symbol: 'pathSegments',
            rhs: ['ID'],
            action: function () {
                return [this.$1];
            }
        }

    ],
    lexer: {
        // states: t et
        rules: [
            {
                // "\n".match(/./)
                regexp: /^[\s\S]*?(?={{)/,
                action: function () {
                    if (this.text.slice(-1) !== '\\') {
                        this.pushState('t');
                    } else {
                        this.text = this.text.slice(0, -1);
                        this.pushState('et');
                    }
                    // only return when has content
                    if (this.text) {
                        return 'CONTENT';
                    }
                }
            },
            {
                regexp: /^[\s\S]+/,
                token: 'CONTENT'
            },
            {
                state: 'et',
                token: 'CONTENT',
                regexp: /^[\s\S]{2,}?(?:(?={{)|$)/,
                action: function () {
                    this.popState();
                }
            },
            {
                state: 't',
                regexp: /^{{#/,
                token: 'OPEN_BLOCK'
            },
            {
                state: 't',
                regexp: /^{{\//,
                token: 'OPEN_END_BLOCK'
            },
            {
                state: 't',
                regexp: /^{{\s*else/,
                token: 'OPEN_INVERSE'
            },
            {
                state: 't',
                regexp: /^{{{/,
                token: 'OPEN_UN_ESCAPED'
            },
            {
                state: 't',
                regexp: /^{{![\s\S]*?}}/,
                action: function () {
                    // return to content mode
                    this.popState();
                }
                // ignore comment
                // ,token: 'COMMENT'
            },
            {
                state: 't',
                regexp: /^{{/,
                token: 'OPEN'
            },
            {
                state: 't',
                regexp: /^\s+/
            },
            {
                state: 't',
                regexp: /^}}}/,
                action: function () {
                    this.popState();
                },
                token: 'CLOSE'
            },
            {
                state: 't',
                regexp: /^}}/,
                action: function () {
                    this.popState();
                },
                token: 'CLOSE'
            },
            {
                state: 't',
                // notice escaped string
                regexp: /^"(\\"|[^"])*"/,
                action: function () {
                    this.text = this.text.slice(1, -1).replace(/\\"/g, '"');
                },
                token: 'STRING'
            },
            {
                state: 't',
                // notice escaped string
                regexp: /^'(\\'|[^'])*'/,
                action: function () {
                    this.text = this.text.slice(1, -1).replace(/\\'/g, "'");
                },
                token: 'STRING'
            },
            {
                state: 't',
                regexp: /^true/,
                token: 'BOOLEAN'
            },
            {
                state: 't',
                regexp: /^false/,
                token: 'BOOLEAN'
            },
            {
                state: 't',
                regexp: /^\d+(?:\.\d+)?(?:e-?\d+)/i,
                token: 'NUMBER'
            },
            {
                state: 't',
                regexp: /^=/,
                token: 'EQUALS'
            },
            {
                state: 't',
                regexp: /^\.\./,
                token: 'ID'
            },
            {
                state: 't',
                regexp: /^[\/.]/,
                token: 'SEP'
            },
            {
                state: 't',
                regexp: /^[a-zA-Z0-9_$-]+/,
                token: 'ID'
            },
            {
                state: 't',
                regexp: /^\[[^\]]*\]/,
                token: 'ID',
                action: function () {
                    this.text = this.text.slice(1, -1);
                }
            },
            {
                state: 't',
                regexp: /^./,
                token: 'INVALID'
            }
        ]
    }

});