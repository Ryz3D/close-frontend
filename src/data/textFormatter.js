import React from "react";
import * as sui from "semantic-ui-react";

class TextFormatter {
    static formatName(name) {
        if (name === undefined || name === "") {
            return "";
        }
        else {
            return (name[0].toUpperCase() + name.substr(1)).replace("_", " ");
        }
    }

    static format(text) {
        text = text.toString();
        const matches = [...text.matchAll(/(icon-[\w\s]+-)/g)];
        if (matches.length === 0) {
            return <>{text}</>;
        }
        else {
            const result = [
                <>{text.substring(0, matches[0].index)}</>
            ];
            for (var mIndex = 0; mIndex < matches.length; mIndex++) {
                const m = matches[mIndex];
                var nextIndex = text.length;
                if (matches[mIndex + 1] !== undefined) {
                    nextIndex = matches[mIndex + 1].index;
                }
                const icon = m[0].substring(5, m[0].length - 1);
                const after = text.substring(m.index + m[0].length, nextIndex);
                if (icon) {
                    result.push(<sui.Icon name={icon} style={{ margin: '0' }} />);
                }
                if (after) {
                    result.push(<>{after}</>);
                }
            }
            return (
                <>
                    {result}
                </>
            );
        }
    }
}

export default TextFormatter;
