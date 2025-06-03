import Form from 'next/form'
import React from "react"

const Newsletter: React.FC = () => {
    return (
        <Form action=''>
            <label htmlFor="news_input">S&apos;inscrire à la newsletter</label>
            <input type="email" name="news_input" id="news_input" />
            <button type="submit">Envoyer</button>
            <div className="rgpd">
                <input type="checkbox" name="news_rgpd" id="news_rgpd" />
                <label htmlFor="news_rgpd">RGPD Label</label>
            </div>
        </Form>
    )
}

export default Newsletter;