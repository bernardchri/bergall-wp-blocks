export default function save({ attributes }) {
    const { spans } = attributes;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {spans.map((span, index) => (
                <span key={index} style={{ margin: '0 5px' }}>
                    {span.type === 'text' ? span.content : <img src={span.content} alt="" style={{ maxWidth: '100%', height: 'auto' }} />}
                </span>
            ))}
        </div>
    );
}
