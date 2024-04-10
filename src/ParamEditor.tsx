import React from 'react';

interface Color {}

interface Param {
    id: number;
    name: string;
    type: string;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors?: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: {
        [paramId: number]: string;
    };
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const paramValues: {
            [paramId: number]: string;
        } = {};

        props.model.paramValues.forEach((paramValue) => {
            paramValues[paramValue.paramId] = paramValue.value;
        });

        this.state = {
            paramValues: paramValues,
        };
    }

    public getModel(): Model {
        const paramEntries = Object.entries(this.state.paramValues);

        const model: Model = {
            paramValues: paramEntries.map(([paramId, value]) => ({
                paramId: Number(paramId),
                value,
            })),
        };

        return model;
    }

    paramChangeHandler(event: React.ChangeEvent<HTMLInputElement>, paramId: number) {
        const value = event.target.value;

        this.setState((prev) => ({
            paramValues: {
                ...prev.paramValues,
                [paramId]: value,
            },
        }));
    }

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <React.Fragment>
                <form className="form">
                    {params.map((param) => (
                        <div className="field" key={param.id}>
                            <label htmlFor={`param_${param.id}`} className="field-label">
                                {param.name}
                            </label>
                            <input
                                type="text"
                                onChange={(event) => this.paramChangeHandler(event, param.id)}
                                id={`param_${param.id}`}
                                value={paramValues[param.id]}
                                className="field-input"
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => alert(JSON.stringify(this.getModel(), null, 2))}
                    >
                        Получить модель
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

export default ParamEditor;
