import cl from './MySelect.module.scss'
import React from 'react';
import $ from 'jquery'
const MySelect = () => {
	let $ = require('jquery');

		$('.select').on('click', '.select__head', function () {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open');
				$(this).next().fadeOut();
			} else {
				$('.select__head').removeClass('open');
				$('.select__list').fadeOut();
				$(this).addClass('open');
				$(this).next().fadeIn();
			}
		});
	
		$('.select').on('click', '.select__item', function () {
			$('.select__head').removeClass('open');
			$(this).parent().fadeOut();
			$(this).parent().prev().text($(this).text());
			$(this).parent().prev().prev().val($(this).text());
		});
	
		$(document).click(function (e) {
			if (!$(e.target).closest('.select').length) {
				$('.select__head').removeClass('open');
				$('.select__list').fadeOut();
			}
		});

	return (
		<div>
			<div className={cl.select}>
				<input className={cl.select__input} type="hidden" name=""/>
				<div className={cl.select__head}>Выберите</div>
				<ul className={cl.select__list} style={{display: 'none'}}>
					<li className={cl.select__item}>Стилизация select CSS</li>
					<li className={cl.select__item}>Стилизация select JavaScript</li>
					<li className={cl.select__item}>Стилизация select, используя input</li>
				</ul>
			</div>
		</div>
	);
};

export default MySelect;