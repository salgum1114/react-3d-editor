import React from 'react';
import { MentionProps, OptionProps } from 'antd/lib/mentions';
import { Mentions as AntMentions, Button } from 'antd';

export interface MentionsProps extends MentionProps {
    addonAfter?: React.ReactElement;
}

class Mentions extends React.PureComponent<MentionsProps> {
    static Option: React.FunctionComponent<OptionProps>;
    render() {
        const { addonAfter, children, ...other } = this.props;
        return (
            <div className="editor-mentions">
                <AntMentions {...other}>
                    {children || []}
                </AntMentions>
                {
                    addonAfter && (
                        <Button type="primary" onClick={() => addonAfter.props.onClick && addonAfter.props.onClick()}>
                            {addonAfter}
                        </Button>
                    )
                }
            </div>
        );
    }
}

Mentions.Option = AntMentions.Option;

export default Mentions;
